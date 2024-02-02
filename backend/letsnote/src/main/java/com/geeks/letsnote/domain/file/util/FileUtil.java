package com.geeks.letsnote.domain.file.util;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
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

        // Build the destination path within the resources directory
        Path destination = Paths.get(absolutePath, "static", destinationPath);

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
        Pattern pattern = Pattern.compile("([^/]+)$");

        Matcher matcher = pattern.matcher(url);

        if (matcher.find()) {
            return matcher.group(1); // Group 1 contains the matched file name
        }

        // Return a default value or handle the case where no match is found
        return "UnknownFileName";
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
