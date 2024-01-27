package com.geeks.letsnote.favorite.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "favorite")
@Getter
@NoArgsConstructor
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Long favorite_id;

    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "favorite_account_id")
    private Long favoriteAccountId;
}
