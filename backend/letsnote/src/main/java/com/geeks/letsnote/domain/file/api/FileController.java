package com.geeks.letsnote.domain.file.api;

import com.geeks.letsnote.domain.file.application.FileService;
import com.geeks.letsnote.domain.file.dto.FileRequest;
import com.geeks.letsnote.domain.file.dto.FileResponse;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Tag(name = "파일 API", description = "파일 관련 API 입니다.")
@RestController
@RequestMapping("/api/v1/files")
public class FileController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/{spaceId}")
    public ResponseEntity<CommonResponse> getImageFile(@PathVariable String spaceId){
        List<FileResponse.Information> files = fileService.getAllImageInfo(spaceId);
        if(!files.isEmpty()){
            CommonResponse response = CommonResponse.builder()
                    .success(true)
                    .response(files)
                    .build();
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else{
            CommonResponse response = CommonResponse.builder()
                    .success(false)
                    .response("file not founded")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
        }
    }


    @PostMapping("/{fileName}")
    public ResponseEntity<CommonResponse> saveImageFile(@PathVariable String fileName, @RequestBody FileRequest.Information information) throws IOException {
        FileRequest.Information fileInfo = FileRequest.Information.builder()
                .fileUrl(information.fileUrl())
                .fileName(fileName)
                .spaceId(information.spaceId())
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

    @PostMapping("/account/{accountId}")
    public ResponseEntity<CommonResponse> saveAccountImage(@PathVariable Long accountId, @RequestParam("picture") MultipartFile file) throws IOException {
        FileRequest.AccontFile accountFile = FileRequest.AccontFile.builder()
                .accountId(accountId)
                .file(file)
                .build();
        if(fileService.saveAccountFile(accountFile)){
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