package com.geeks.letsnote.domain.file.application;

import com.geeks.letsnote.domain.file.dto.FileRequest;
import com.geeks.letsnote.domain.file.dto.FileResponse;

import java.io.IOException;
import java.util.List;

public interface FileService {
    boolean saveImageFile(FileRequest.Information fileInfo) throws IOException;

    boolean saveAccountFile(FileRequest.AccontFile accontFile) throws IOException;

    List<FileResponse.Information> getAllImageInfo(String spaceId);
}
