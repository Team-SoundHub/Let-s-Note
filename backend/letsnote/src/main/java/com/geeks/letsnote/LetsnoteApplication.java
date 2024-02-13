package com.geeks.letsnote;

import com.geeks.letsnote.global.infrastructure.dto.AIModelRequest;
import com.geeks.letsnote.global.infrastructure.dto.AIModelResponse;
import com.geeks.letsnote.global.infrastructure.application.AIModelService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;


@SpringBootApplication
public class LetsnoteApplication implements ApplicationRunner {

	private final AIModelService aiModelService;

	public LetsnoteApplication(AIModelService aiModelService) {
		this.aiModelService = aiModelService;
	}

	@Override
	public void run(ApplicationArguments args) {
//		performModelCall();
	}

	public static void main(String[] args) {
		SpringApplication.run(LetsnoteApplication.class, args);
	}

	public void performModelCall() {
		try {
			AIModelResponse.Note response = aiModelService.sendRequestToAPI(new AIModelRequest.BasicRequest("minkyu", "make still dre note"));
			System.out.println(response);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
