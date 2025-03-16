package com.barberbook.barberbook_backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @GetMapping("/")
    public String redirectToApi(RedirectAttributes redirectAttributes) {
        return "redirect:/api/";
    }

    @GetMapping("/api/")
    @ResponseBody
    public String home() {
        return "BarberBook - Api";
    }

}