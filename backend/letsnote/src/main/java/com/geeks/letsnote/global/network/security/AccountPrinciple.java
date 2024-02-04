package com.geeks.letsnote.global.network.security;

import java.security.Principal;

public class AccountPrinciple implements Principal {

    private String name;

    public AccountPrinciple(String name) {
        this.name = name;
    }


    @Override
    public String getName() {
        return name;
    }
}
