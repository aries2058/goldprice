package com.dandj.goldprice.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@ToString(exclude = "comp")
@Table(name = "comp_files")
public class CompFile {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String filePath;

    @Column(length = 50)
    private String ipAddr;

    @ManyToOne(fetch = FetchType.LAZY)
    private Comp comp;
}
