package com.carvantage.services;

import java.util.List;
import com.carvantage.entity.CarVantageInvoiceEntity;

public interface CarVantageInvoiceService {

    List<CarVantageInvoiceEntity> getAllInvoices();

    CarVantageInvoiceEntity saveInvoice(CarVantageInvoiceEntity invoice);

    void deleteInvoice(Long id);

    CarVantageInvoiceEntity updatePaymentStatus(Long id, String status);
    public CarVantageInvoiceEntity update(Long id, CarVantageInvoiceEntity en);

}
