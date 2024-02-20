package com.geeks.letsnote.domain.file.application.impl;

import com.geeks.letsnote.domain.file.application.FileService;
import com.geeks.letsnote.domain.file.dao.AccountFileRepository;
import com.geeks.letsnote.domain.file.dao.FileRepository;
import com.geeks.letsnote.domain.file.dto.FileRequest;
import com.geeks.letsnote.domain.file.dto.FileResponse;
import com.geeks.letsnote.domain.file.entity.AccountFile;
import com.geeks.letsnote.domain.file.entity.File;
import com.geeks.letsnote.domain.file.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;
    private final AccountFileRepository accountFileRepository;
    @Autowired
    private FileUtil fileUtil;

    @Override
    public boolean saveImageFile(FileRequest.Information fileInfo) throws IOException {
        String fileUrl = fileInfo.fileUrl();
        String fileName = fileUtil.extractFileName(fileUrl);

//            if (fileUtil.downloadFile(fileInfo.fileUrl(), fileName)) {
        File file = File.builder()
                .fileName(fileInfo.fileName())
                .fileUrl(fileInfo.fileUrl())
                .spaceId(fileInfo.spaceId())
                .build();
        fileRepository.save(file);
        return true;
//            }
    }

    @Override
    public boolean saveAccountFile(FileRequest.AccontFile accountFile) {
        try {
            String fileUrl = fileUtil.storeFile(accountFile.file());
            AccountFile result = AccountFile.builder()
                    .accountId(accountFile.accountId())
                    .fileUrl(fileUrl)
                    .build();

            accountFileRepository.save(result);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }


    @Override
    public List<FileResponse.Information> getAllImageInfo(String spaceId) {
        List<File> files = fileRepository.findAllBySpaceId(spaceId);
        List<FileResponse.Information> resultList= new ArrayList<>();
        for(File file : files){
            FileResponse.Information info = FileResponse.Information.builder()
                    .fileName(file.getFileName())
                    .fileUrl(file.getFileUrl())
                    .build();

            resultList.add(info);
        }

        return resultList;
    }

}
