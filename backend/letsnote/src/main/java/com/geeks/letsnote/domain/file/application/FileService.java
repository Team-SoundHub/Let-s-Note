package com.geeks.letsnote.domain.file.application;

import com.geeks.letsnote.domain.file.dto.FileResponse;

import java.io.IOException;

public interface FileService {
    boolean saveImageFile(FileResponse.Information fileInfo) throws IOException;
}
