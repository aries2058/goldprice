package com.dandj.goldprice.service;

import com.dandj.goldprice.dto.CompDto;
import com.dandj.goldprice.entity.Comp;
import com.dandj.goldprice.entity.PriceGold;
import com.dandj.goldprice.repository.CompRepository;
import com.dandj.goldprice.repository.PriceGoldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PriceService {
    private final PriceGoldRepository priceGoldRepository;

}
