package com.geeks.letsnote.domain.file.util;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class FileUtil {
    private ResourceLoader resourceLoader;

    public boolean downloadFile(String url, String destinationPath) throws IOException {
        URL fileUrl = new URL(url);

        Path resourceDirectory = Paths.get("backend", "letsnote", "src", "main", "resources");
        String absolutePath = resourceDirectory.toFile().getAbsolutePath();
        String filename = decodeFileName(destinationPath);
        Path destination = Paths.get(absolutePath, "static", filename);

        Files.createDirectories(destination.getParent());

        try (InputStream inputStream = fileUrl.openStream()) {
            Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }


    public String extractFileName(String url) {
        Pattern pattern = Pattern.compile("/([^/?]+)\\?");

        Matcher matcher = pattern.matcher(url);

        if (matcher.find()) {
            return matcher.group(1);
        }

        return "UnknownFileName";
    }

    public static String decodeFileName(String encodedFileName) {
        try {
            return URLDecoder.decode(encodedFileName, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "UnknownFileName";
        }
    }

    public String storeFile(MultipartFile file) throws IOException {
        String baseUrl = getBaseUrl();
        File folder = new File(baseUrl + "/static/");

        String originalFileName = file.getOriginalFilename();

        String uniqueFileName = System.currentTimeMillis() + "_" + originalFileName;

        Path filePath = folder.toPath().resolve(uniqueFileName);

        Files.createDirectories(filePath.getParent());

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return baseUrl + "/accountImage/" + uniqueFileName;
    }

    private String getBaseUrl() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
        }

        return "http://localhost:9807";
    }
}
