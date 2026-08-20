package com.raviteja.portfolio.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "*")
public class PortfolioController {

    @GetMapping("/test")
    public String test() {
        return "WORKING 61!";
    }

    @GetMapping("/profile")
    public Map<String, Object> getProfile() {
        Map<String, Object> profile = new HashMap<>();
        profile.put("name", "Ravi Teja");
        profile.put("role", "Java Full Stack Developer");
        profile.put("location", "Andhra Pradesh, India");
        profile.put("experience", "100 Projects Challenge - 61/100");
        profile.put("email", "raviteja.dev950@gmail.com");
        profile.put("github", "raviteja-dev950");
        profile.put("about", "Passionate Java Full Stack Developer building 100 projects in 100 days. Tier 6 Frontend Mastery.");
        profile.put("skills", Arrays.asList("Java", "Spring Boot", "React", "JavaScript", "MySQL", "TailwindCSS"));
        return profile;
    }

    @GetMapping("/projects")
    public List<Map<String, Object>> getProjects() {
        List<Map<String, Object>> projects = new ArrayList<>();
        
        Map<String, Object> p60 = new HashMap<>();
        p60.put("id", 60);
        p60.put("title", "Kanban Board - Trello Clone");
        p60.put("tech", "React + Spring Boot");
        p60.put("status", "Completed");
        p60.put("link", "https://github.com/raviteja-dev950/60-kanban-board");
        projects.add(p60);

        Map<String, Object> p59 = new HashMap<>();
        p59.put("id", 59);
        p59.put("title", "Chat UI + Messages API");
        p59.put("tech", "React + Spring Boot");
        p59.put("status", "Completed");
        p59.put("link", "https://github.com/raviteja-dev950/59-chat-ui");
        projects.add(p59);

        Map<String, Object> p61 = new HashMap<>();
        p61.put("id", 61);
        p61.put("title", "Portfolio Site - Personal Website");
        p61.put("tech", "React + Spring Boot");
        p61.put("status", "In Progress");
        p61.put("link", "https://github.com/raviteja-dev950/61-portfolio-site");
        projects.add(p61);

        return projects;
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProjects", 61);
        stats.put("tier", "Tier 6");
        stats.put("completed", 60);
        stats.put("inProgress", 1);
        stats.put("tierProgress", "8/10");
        return stats;
    }

    @PostMapping("/contact")
    public Map<String, Object> contact(@RequestBody Map<String, String> payload) {
        Map<String, Object> res = new HashMap<>();
        res.put("message", "Thanks " + payload.get("name") + "! Message received! I will reply soon!");
        res.put("email", payload.get("email"));
        res.put("status", "success");
        return res;
    }
}