package com.dandj.goldprice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Chat extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20)
    private String userId;

    @Column(length = 1)
    private String newYn;

    @Column(length = 1)
    private String sendYn;

    @Column(length = 1)
    private String delYn;

    private String content;
}
