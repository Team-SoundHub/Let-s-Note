package com.geeks.letsnote.domain.account.application;

import com.geeks.letsnote.domain.account.dto.RequestMemberFacade;
import com.geeks.letsnote.domain.account.dto.ResponseMemberFacade;

public interface MemberFacadeService {

    ResponseMemberFacade.Information signup(RequestMemberFacade.Register registerDto);
}