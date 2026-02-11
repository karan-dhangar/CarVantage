package com.carvantage.serviceImplts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carvantage.entity.CarVantageInvoiceEntity;
import com.carvantage.repo.CarVantageInvoiceRepo;
import com.carvantage.services.CarVantageInvoiceService;

@Service
public class CarVantageInvoiceServiceImplts 
        implements CarVantageInvoiceService {

    @Autowired
    private CarVantageInvoiceRepo invoiceRepo;

    @Override
    public List<CarVantageInvoiceEntity> getAllInvoices() {
        return invoiceRepo.findAll();
    }

    @Override
    public CarVantageInvoiceEntity saveInvoice(CarVantageInvoiceEntity invoice) {
        return invoiceRepo.save(invoice);
    }

    @Override
    public void deleteInvoice(Long id) {
        invoiceRepo.deleteById(id);
    }

    @Override
    public CarVantageInvoiceEntity updatePaymentStatus(Long id, String status) {
        CarVantageInvoiceEntity invoice = invoiceRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        invoice.setPaymentStatus(status);
        return invoiceRepo.save(invoice);
    }
    @Override
    public CarVantageInvoiceEntity update(Long id, CarVantageInvoiceEntity en) {

        CarVantageInvoiceEntity existing = invoiceRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id " + id));

        existing.setCustomerName(en.getCustomerName());
        existing.setServiceName(en.getServiceName());
        existing.setAmount(en.getAmount());
        existing.setInvoiceDate(en.getInvoiceDate());
        existing.setPaymentStatus(en.getPaymentStatus());

        return invoiceRepo.save(existing);
    }

}
