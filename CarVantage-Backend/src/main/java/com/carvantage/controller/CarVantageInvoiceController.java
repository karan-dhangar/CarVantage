package com.carvantage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.carvantage.entity.CarVantageInvoiceEntity;
import com.carvantage.services.CarVantageInvoiceService;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin("*")
public class CarVantageInvoiceController {

    @Autowired
    private CarVantageInvoiceService invoiceService;

    // GET ALL INVOICES
    @GetMapping
    public List<CarVantageInvoiceEntity> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    // CREATE INVOICE
    @PostMapping
    public CarVantageInvoiceEntity saveInvoice(
            @RequestBody CarVantageInvoiceEntity invoice) {
        return invoiceService.saveInvoice(invoice);
    }

    // DELETE INVOICE
    @DeleteMapping("/{id}")
    public void deleteInvoice(@PathVariable Long id) {
        invoiceService.deleteInvoice(id);
    }

    // UPDATE PAYMENT STATUS
    @PutMapping("/status/{id}")
    public CarVantageInvoiceEntity updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return invoiceService.updatePaymentStatus(id, status);
    }
    @PutMapping("/{id}")
    public ResponseEntity<CarVantageInvoiceEntity> updateInvoice(
            @PathVariable Long id,
            @RequestBody CarVantageInvoiceEntity en) {

        CarVantageInvoiceEntity updated = invoiceService.update(id, en);
        return ResponseEntity.ok(updated);
    }

}


