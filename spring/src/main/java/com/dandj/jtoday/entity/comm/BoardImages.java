package com.dandj.jtoday.entity.comm;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString(exclude = "board")
public class BoardImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long imageId;

    @Column(length = 1)
    private String delYn;

    @ManyToOne(fetch = FetchType.LAZY)
    private Board board;
}
