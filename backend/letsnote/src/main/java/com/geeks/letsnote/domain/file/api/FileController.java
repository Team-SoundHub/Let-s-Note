package com.geeks.letsnote.domain.file.api;

import com.geeks.letsnote.domain.file.application.FileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@Tag(name = "파일 API", description = "파일 관련 API 입니다.")
@RestController
@RequestMapping("/api/v1/files")
public class FileController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

}