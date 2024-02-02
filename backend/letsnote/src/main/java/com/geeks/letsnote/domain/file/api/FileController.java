package com.geeks.letsnote.domain.file.api;

import com.geeks.letsnote.domain.file.application.FileService;
import com.geeks.letsnote.domain.file.dto.FileRequest;
import com.geeks.letsnote.domain.file.dto.FileResponse;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Tag(name = "파일 API", description = "파일 관련 API 입니다.")
@RestController
@RequestMapping("/api/v1/files")
public class FileController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/{fileName}")
    public ResponseEntity<CommonResponse> saveImageFile(@PathVariable String fileName, @RequestBody FileRequest.Information information) throws IOException {
        FileResponse.Information fileInfo = FileResponse.Information.builder()
                .fileUrl(information.fileUrl())
                .fileName(fileName)
                .accountId(information.accountId())
                .build();
        if(fileService.saveImageFile(fileInfo)){
            CommonResponse response = CommonResponse.builder()
                    .success(true)
                    .response("file Saved")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            CommonResponse response = CommonResponse.builder()
                    .success(false)
                    .response("")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }



}