package com.chillisrestaurant.app.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("api/main/")
public class MainController {
    
    @GetMapping("hello")
    public String hello(){
        return "Hello World!";
    }
}
