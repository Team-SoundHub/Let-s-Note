package com.geeks.letsnote.domain.file.application.impl;

import com.geeks.letsnote.domain.file.application.FileService;
import com.geeks.letsnote.domain.file.dao.FileRepository;
import com.geeks.letsnote.domain.file.dto.FileResponse;
import com.geeks.letsnote.domain.file.entity.File;
import com.geeks.letsnote.domain.file.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;
    @Autowired
    private FileUtil fileUtil;

    @Override
    public boolean saveImageFile(FileResponse.Information fileInfo) throws IOException {
        try {
            String fileUrl = fileInfo.fileUrl();
            String fileName = fileUtil.extractFileName(fileUrl);

            if (fileUtil.downloadFile(fileInfo.fileUrl(), fileName)) {
                File file = File.builder()
                        .fileName(fileInfo.fileName())
                        .fileUrl(fileInfo.fileUrl())
                        .accountId(fileInfo.accountId())
                        .build();
                fileRepository.save(file);
                return true;
            }
        } catch (IOException e) {
            throw new IOException("Error saving image file: " + e.getMessage(), e);
        }
        return false;
    }

}
