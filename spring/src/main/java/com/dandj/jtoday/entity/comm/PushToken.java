package com.dandj.jtoday.entity.comm;


import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@Table(name = "push_token")
public class PushToken {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private Long uuid;
    private String pushToken;
    @Column(length = 5)
    private String pushType;
    @Column(length = 1)
    private String pushYn;
    private String expireDt;
}
