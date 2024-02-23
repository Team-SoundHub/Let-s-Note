package com.geeks.letsnote.domain.studio.workSpace.semaphore;


import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Semaphore;

@Service
public class SemaphoreService {

    private final ConcurrentHashMap<String, Semaphore> workspaceSemaMap = new ConcurrentHashMap<>();
    private final Semaphore createSema = new Semaphore(1, true);

    public void acquireInitialSema() {
        try{
            createSema.acquire();
        } catch (InterruptedException e){
            Thread.currentThread().interrupt();
        }
    }

    public void releaseInitialSema() {
        createSema.release();
    }

    public void initializeSemaphore(String spaceId) {
        if(!workspaceSemaMap.containsKey(spaceId)){
            Semaphore semaphore = new Semaphore(1, true); // true 파라미터는 공정한 순서로 획득
            workspaceSemaMap.put(spaceId, semaphore);
        }
    }

    // 세마포어 삭제
    public void removeSemaphore(String spaceId) {
        workspaceSemaMap.remove(spaceId);
    }

    // 세마포어 획득
    public void acquireSemaphore(String spaceId) {
        Semaphore semaphore = workspaceSemaMap.get(spaceId);
        if (semaphore != null) {
            try {
                semaphore.acquire();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    // 세마포어 내려놓기
    public void releaseSemaphore(String spaceId) {
        Semaphore semaphore = workspaceSemaMap.get(spaceId);
        if (semaphore != null) {
            semaphore.release();
        }
    }
}
