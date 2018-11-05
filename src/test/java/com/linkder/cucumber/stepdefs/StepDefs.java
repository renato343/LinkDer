package com.linkder.cucumber.stepdefs;

import com.linkder.LinkderApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = LinkderApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
