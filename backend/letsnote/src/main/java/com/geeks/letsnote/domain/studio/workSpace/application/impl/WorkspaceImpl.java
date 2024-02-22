package com.geeks.letsnote.domain.studio.workSpace.application.impl;


import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.account.dao.AccountRepository;
import com.geeks.letsnote.domain.account.entity.Account;
import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotService;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteInstrumentMapService;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteService;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceMemberMapService;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import com.geeks.letsnote.domain.studio.workSpace.dao.WorkspaceMemberMapRepository;
import com.geeks.letsnote.domain.studio.workSpace.dao.WorkspaceRepository;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.entity.Workspace;
import com.geeks.letsnote.global.network.dto.SocketRequest;
import com.geeks.letsnote.global.network.dto.SocketResponse;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WorkspaceImpl implements WorkspaceService {
    private final WorkspaceRepository workspaceRepository;
    private final AccountRepository accountRepository;
    private final WorkspaceMemberMapRepository workspaceMemberMapRepository;
    private final WorkspaceMemberMapService workspaceMemberMapService;
    private final NoteInstrumentMapService noteInstrumentMapService;
    private final SnapshotService snapshotService;
    private final AccountService accountService;
    private final NoteService noteService;


    public WorkspaceImpl(WorkspaceRepository workspaceRepository, AccountRepository accountRepository, WorkspaceMemberMapRepository workspaceMemberMapRepository, WorkspaceMemberMapService workspaceMemberMapService, NoteInstrumentMapService noteInstrumentMapService, SnapshotService snapshotService, AccountService accountService, NoteService noteService) {
        this.workspaceRepository = workspaceRepository;
        this.accountRepository = accountRepository;
        this.workspaceMemberMapRepository = workspaceMemberMapRepository;
        this.workspaceMemberMapService = workspaceMemberMapService;
        this.noteInstrumentMapService = noteInstrumentMapService;
        this.snapshotService = snapshotService;
        this.accountService = accountService;
        this.noteService = noteService;
    }

    @Override
    public List<ResponseWorkspaces.WorkspaceDto> getAllWorkspacesByOwnerId(Long accountId) {
        List<String> workSpaceIdsFromAccountId = workspaceMemberMapRepository.findSpaceIdsByAccountId(accountId);
        List<Workspace> workspaceList = workspaceRepository.findWorkSpacesBySpaceIdsOrderByUpdateAt(workSpaceIdsFromAccountId);
        List<ResponseWorkspaces.WorkspaceDto> workspaceDtoList = new ArrayList<>();

        for(Workspace workspace : workspaceList) {
            List<Long> accountIdsFromSpaceId = workspaceMemberMapRepository.findAccountIdsBySpaceId(workspace.getSpaceId());
            List<String> memberNickNames = accountRepository.findMemberNickNamesFromAccountIds(accountIdsFromSpaceId);
            String ownerNickName = accountRepository.findOneNicknameById(workspace.getOwnerId());

            ResponseWorkspaces.WorkspaceDto workspaceDto = ResponseWorkspaces.WorkspaceDto.builder()
                    .spaceId(workspace.getSpaceId())
                    .ownerNickname(ownerNickName)
                    .memberNicknames(memberNickNames)
                    .spaceTitle(workspace.getSpaceTitle())
                    .spaceContent(workspace.getSpaceContent())
                    .updateAt(workspace.getUpdateAt())
                    .build();
            workspaceDtoList.add(workspaceDto);
        }

        return workspaceDtoList;
    }



    @Override
    @Transactional
    public ResponseWorkspaces.WorkspaceId createWorkspace(RequestWorkspaces.WorkspaceDto workspaceDto, Long accountId) {
        String spaceId = UUID.randomUUID().toString().replace("-","");
        Workspace workspace = Workspace.builder()
                .spaceId(spaceId)
                .ownerId(accountId)
                .spaceTitle(workspaceDto.spaceTitle())
                .spaceContent(workspaceDto.spaceContent())
                .snapshotCount(0)
                .workspaceBpm(160)
                .build();
        workspaceRepository.save(workspace);

        workspaceDto.membersAccountId().add(accountId);
        RequestWorkspaces.WorkspaceMemberMapDto workspaceMemberMapDto = RequestWorkspaces.WorkspaceMemberMapDto.builder()
                .memberAccountId(workspaceDto.membersAccountId())
                .spaceId(workspace.getSpaceId())
                .build();

        workspaceMemberMapService.createWorkspaceMemberMap(workspaceMemberMapDto);

        noteInstrumentMapService.createWorkspaceInstrumentMap(spaceId);

        return ResponseWorkspaces.WorkspaceId.builder()
                .spaceId(workspace.getSpaceId())
                .build();
    }

    @Override
    public ResponseWorkspaces.WorkspaceIn getAllNotesOfWorkspace(String spaceId) {
        Optional<Workspace> thisWorkSpace = workspaceRepository.findById(spaceId);
        List<ResponseNotes.Notes> allNotes = new ArrayList<>();
        ResponseNotes.Notes pianoNotes = noteInstrumentMapService.getAllInstrumentNoteBySpaceId(spaceId, Instrument.Piano);
        allNotes.add(pianoNotes);
        ResponseNotes.Notes guitarNotes = noteInstrumentMapService.getAllInstrumentNoteBySpaceId(spaceId, Instrument.Guitar);
        allNotes.add(guitarNotes);
        Integer maxNoteX = 0;
        for (ResponseNotes.Notes notes : allNotes){
            Integer maxX = notes.notes().stream()
                    .map(ResponseNotes.Note::noteX)
                    .max(Integer::compare).orElse(0);

            if(maxNoteX < maxX){
                maxNoteX = maxX;
            }
        }
        ResponseNotes.Notes drumNotes = noteInstrumentMapService.getAllInstrumentNoteBySpaceId(spaceId,Instrument.Drum);
        allNotes.add(drumNotes);

        boolean isSnapshotExist = snapshotService.findSnapshotExist(spaceId);


        return ResponseWorkspaces.WorkspaceIn.builder()
                .notesList(allNotes)
                .isSnapshotExist(isSnapshotExist)
                .maxX(maxNoteX)
                .bpm(thisWorkSpace.get().getWorkspaceBpm())
                .build();
    }

    //for db delete
    @Override
    public void deleteAllWorkspaces() {
        workspaceRepository.deleteAll();
    }

    @Override
    public List<String> getSpaceIdsFromAccountId(Long accountId) {
        List<String> workSpaceIdsFromAccountId = workspaceMemberMapRepository.findSpaceIdsByAccountId(accountId);
        return workSpaceIdsFromAccountId;
    }

    @Override
    public List<String> getMemberNicknamesFromWorkspace(Workspace workspace) {
        List<Long> accountIdsFromSpaceId = workspaceMemberMapRepository.findAccountIdsBySpaceId(workspace.getSpaceId());
        List<String> memberNickNames = accountRepository.findMemberNickNamesFromAccountIds(accountIdsFromSpaceId);
        return memberNickNames;
    }

    @Override
    public String getOwnerNicknameFromWorkspace(Workspace workspace) {
        return accountRepository.findOneNicknameById(workspace.getOwnerId());
    }

    @Override
    public Workspace getById(String workspaceId) {
        return workspaceRepository.findById(workspaceId).get();
    }

    @Override
    public ResponseWorkspaces.WorkspaceMembers getMemberNicknamesFromSpaceId(String spaceId) {
        Optional<Workspace> workspace = workspaceRepository.findById(spaceId);
        return ResponseWorkspaces.WorkspaceMembers.builder()
                .membersNickname(getMemberNicknamesFromWorkspace(workspace.get()))
                .ownerNickname(getOwnerNicknameFromWorkspace(workspace.get()))
                .build();
    }

    @Override
    public boolean checkMaxCountSnapshot(String spaceId) {
        Optional<Workspace> workspace = workspaceRepository.findById(spaceId);

        return workspace.get().getSnapshotCount() <= 15 ? true : false;
    }

    @Override
    @Transactional
    public void increaseSnapshotCount(String spaceId) {
        workspaceRepository.incrementSnapshotCount(spaceId);
    }

    @Override
    @Transactional
    public void decreaseSnapshotCountById(Workspace snapshotWorkspace) {
        workspaceRepository.decrementSnapshotCount(snapshotWorkspace.getSpaceId());
    }
    @Override
    public ResponseWorkspaces.MemberNickname addMemberOfWorkspace(String userId, String spaceId) {
        Optional<Account> user = accountService.getAccountFromUserId(userId);
        if(user != null){
            workspaceMemberMapService.addMemberMap(spaceId,user.get().getId());
            return ResponseWorkspaces.MemberNickname.builder()
                    .nickname(user.get().getNickname()).build();
        }
        return null;

    }

    @Override
    @Transactional
    public SocketResponse.LoopNotes makeLoop(SocketRequest.LoopStatus loopStatus, String spaceId) {
        //spaceId와 악기 파악해서 노트 정보 가져오기
        ResponseNotes.Notes notes = noteInstrumentMapService.getAllInstrumentNoteBySpaceId(spaceId,Instrument.fromString(loopStatus.instrument()));
        if(notes.notes().size() < 1){
            return null;
        }
        //현재 있는 노트가 어느 구간까지 가지고 있는가? maxX가 0~3이면 1구간 , maxX가 4~7이면 2구간 , ...
        Integer loopCount = calculateMaxXLoop(notes);
        //만약 구간이 현재 workspace의 끝구간과 같을 경우 (= loopStation이 적용됬을 경우) 루프 취소 -> 노트 정보 삭제하고 삭제한 노트 리스트 websocket return
        if(loopCount >= (loopStatus.spaceLength()/4 + 1)){
            List<SocketResponse.Note> loopNotes = noteInstrumentMapService.deleteNoteBySpaceIdAndInstrument(SocketRequest.SpaceInstrument.builder()
                    .instrument(Instrument.fromString(loopStatus.instrument()))
                    .spaceId(spaceId)
                    .build());
            SocketResponse.LoopNotes loopInstrumentNotes = SocketResponse.LoopNotes.builder()
                    .Notes(loopNotes)
                    .instrument(loopStatus.instrument())
                    .build();
            return loopInstrumentNotes;
        }
        //루프 계산해서 2중 포문 ( 1중 포문은 구간별 노트복제(안쪽 for 문) , 2중포문은 그 구간을 현재 작업실의 끝까지(바깥쪽 for 문) )
        else{
            List<SocketResponse.Note> loopNotes = new ArrayList<>();
            for(int i = loopCount; i<= loopStatus.spaceLength()/4 + 1; i = i+loopCount){
                for(ResponseNotes.Note eachNote : notes.notes()){
                    Integer loopX = eachNote.noteX() + i*4;
                    loopNotes.add(SocketResponse.Note.builder()
                            .x(loopX)
                            .y(eachNote.noteY())
                            .build());
                }
            }
            String mapId = noteInstrumentMapService.getInstrumentMapBySpaceIdAndInstrument(spaceId,Instrument.fromString(loopStatus.instrument()));
            noteService.createNotesByMapId(mapId,loopNotes);

            return SocketResponse.LoopNotes.builder()
                    .Notes(loopNotes)
                    .instrument(loopStatus.instrument())
                    .build();
        }
    }
    @Override
    public Integer calculateMaxXLoop(ResponseNotes.Notes notes){
        Integer maxX = notes.notes().stream()
                .map(ResponseNotes.Note::noteX)
                .max(Integer::compare).orElse(null);

        return maxX/4 + 1;
    }

    @Override
    @Transactional
    public void deleteWorkspaceById(String spaceId) {
        workspaceRepository.deleteById(spaceId);
    }
}
