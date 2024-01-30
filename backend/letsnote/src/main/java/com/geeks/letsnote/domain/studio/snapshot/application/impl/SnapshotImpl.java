package com.geeks.letsnote.domain.studio.snapshot.application.impl;

import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotInstrumentMapService;
import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotService;
import com.geeks.letsnote.domain.studio.snapshot.dao.SnapshotRepository;
import com.geeks.letsnote.domain.studio.snapshot.dto.RequestSnapshot;
import com.geeks.letsnote.domain.studio.snapshot.dto.ResponseSnapshot;
import com.geeks.letsnote.domain.studio.snapshot.entity.Snapshot;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class SnapshotImpl implements SnapshotService {
    private final SnapshotRepository snapshotRepository;
    private final SnapshotInstrumentMapService snapshotInstrumentMapService;
    private final WorkspaceService workspaceService;

    public SnapshotImpl(SnapshotRepository snapshotRepository, SnapshotInstrumentMapService snapshotInstrumentMapService, @Lazy WorkspaceService workspaceService) {
        this.snapshotRepository = snapshotRepository;
        this.snapshotInstrumentMapService = snapshotInstrumentMapService;
        this.workspaceService = workspaceService;
    }

    @Override
    @Transactional
    public ResponseSnapshot.SnapshotId createSnapshot(String spaceId, RequestSnapshot.SnapshotDto snapshotDto) {
        String snapshotId = UUID.randomUUID().toString().replace("-","");
        snapshotRepository.save(Snapshot.builder()
                .snapshotContent(snapshotDto.snapshotContent())
                .snapshotId(snapshotId)
                .snapshotTitle(snapshotDto.snapshotTitle())
                .spaceId(spaceId)
                .views(0L)
                .build());

        snapshotInstrumentMapService.createSnapshotInstrumentMap(snapshotId, spaceId);

        return ResponseSnapshot.SnapshotId.builder()
                .snapshotId(snapshotId)
                .build();
    }

    @Override
    public boolean findSnapshotExist(String spaceId) {
        Optional<Snapshot> findSnapshot = snapshotRepository.findBySpaceId(spaceId);

        return findSnapshot.isPresent() ? true : false;
    }
}
