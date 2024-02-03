package com.geeks.letsnote.domain.file.util;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
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

        // Get the resource directory from the classpath
        Path resourceDirectory = Paths.get("backend", "letsnote", "src", "main", "resources");
        String absolutePath = resourceDirectory.toFile().getAbsolutePath();
        String filename = decodeFileName(destinationPath);
        // Build the destination path within the resources directory
        Path destination = Paths.get(absolutePath, "static", filename);

        // Ensure that the parent directories of the destination path exist
        Files.createDirectories(destination.getParent());

        // Copy the content from the URL to the local file
        try (InputStream inputStream = fileUrl.openStream()) {
            Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }


    public String extractFileName(String url) {
        // Define the regex pattern to match the last part of the URL
        Pattern pattern = Pattern.compile("/([^/?]+)\\?");

        Matcher matcher = pattern.matcher(url);

        if (matcher.find()) {
            return matcher.group(1); // Group 1 contains the matched file name
        }

        // Return a default value or handle the case where no match is found
        return "UnknownFileName";
    }

    public static String decodeFileName(String encodedFileName) {
        try {
            return URLDecoder.decode(encodedFileName, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            // Handle the exception (e.g., log the error or return a default value)
            e.printStackTrace();
            return "UnknownFileName";
        }
    }

    public boolean storeFile(MultipartFile file) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:static/");
        File folder = resource.getFile();

        String fileName = file.getOriginalFilename();
        File newFile = new File(folder.getAbsolutePath() + File.separator + fileName);

        FileCopyUtils.copy(file.getBytes(), newFile);

        return true;
    }
}
