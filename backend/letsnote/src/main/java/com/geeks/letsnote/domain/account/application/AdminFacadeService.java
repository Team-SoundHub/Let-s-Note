package com.geeks.letsnote.domain.account.application;

import com.geeks.letsnote.domain.account.dto.RequestAdminFacade;
import com.geeks.letsnote.domain.account.dto.ResponseAdminFacade;

public interface AdminFacadeService {

    ResponseAdminFacade.Information signup(RequestAdminFacade.Register registerDto);
}
