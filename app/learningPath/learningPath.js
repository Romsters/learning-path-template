﻿define(['knockout', 'course/course', 'constants', 'data/dataContext', 'durandal/app'], function (ko, Course, constants, dataContext, app) {
    "use strict";

    var viewModel = {
        courses: [],
        title: '',
        score: ko.observable(0),
        completedCoursesCount: ko.observable(0),
        progressTrackableCoursesCount: 0,
        activate: activate
    };

    return viewModel;

    function activate() {
        viewModel.title = dataContext.learningPath.title;
        viewModel.score(dataContext.learningPath.getScore());
        viewModel.completedCoursesCount(dataContext.learningPath.getCompletedCoursesCount());
        viewModel.progressTrackableCoursesCount = dataContext.learningPath.getProgressTrackableCoursesCount();

        viewModel.courses = _.map(dataContext.learningPath.courses, function(course) {
            return new Course(course);
        });

        app.on(constants.events.course.resultChanged, function () {
            viewModel.score(dataContext.learningPath.getScore());
            viewModel.completedCoursesCount(dataContext.learningPath.getCompletedCoursesCount());
        });
    }
});