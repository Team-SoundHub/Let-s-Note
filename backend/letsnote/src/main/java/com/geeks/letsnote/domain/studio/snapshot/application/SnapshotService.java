package com.geeks.letsnote.domain.studio.snapshot.application;

import com.geeks.letsnote.domain.studio.snapshot.dto.RequestSnapshot;
import com.geeks.letsnote.domain.studio.snapshot.dto.ResponseSnapshot;

public interface SnapshotService {
    ResponseSnapshot.SnapshotId createSnapshot(String spaceId, RequestSnapshot.SnapshotDto snapshotDto);

    boolean findSnapshotExist(String spaceId);
}
