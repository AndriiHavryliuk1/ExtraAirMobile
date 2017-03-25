/**
 * Created by mykhailo.semeniuk on 11/2/2016.
 */

var app = angular.module('ExtraAir');

var oneNumberLessons = function (number,
                                 firstGroupAlways,
                                 firstGroupNumerator,
                                 firstGroupDenominator,
                                 secondGroupAlways,
                                 secondGroupNumerator,
                                 secondGroupDenominator,
                                 allAlways,
                                 allNumerator,
                                 allDenominator) {
    var firstRow = "";
    var secondRow = "";

    if (allNumerator != null) {
        firstRow = "<div  class=' col-sm-12  col-xs-12 all-group-rectangle' ><a href='#/lesson/" + allNumerator.id + "'>" + allNumerator.title + "</a></div>";
    }
    else {
        firstRow = oneRow(firstGroupNumerator, secondGroupNumerator);
    }

    if (allDenominator != null) {
        secondRow = "<div class='col-sm-12 col-xs-12 all-group-rectangle' ><a href='#/lesson/" + allDenominator.id + "'>" + allDenominator.title + "</a></div>";
    } else {
        secondRow = oneRow(firstGroupDenominator, secondGroupDenominator);
    }

    if (firstGroupAlways != null) {
        console.log("title=" + firstGroupAlways.title + "|");
        firstRow = "<div class='col-sm-6 col-xs-6 first-group-rectangle'> <a href='#/lesson/" + firstGroupAlways.id + "'>" + firstGroupAlways.title + "</a></div>";
    }
    if (secondGroupAlways != null) {
        console.log("title2=" + secondGroupAlways.title + "|");
        secondRow = "<div class='col-sm-6 col-xs-6 second-group-rectangle'> <a href='#/lesson/" + secondGroupAlways.id + "'>" + secondGroupAlways.title + "</a></div>";
    }
    if (allAlways != null) {
        var row = "<div class='col-sm-12 col-xs-12 all-group-rectangle' > <a href='#/lesson/" + allAlways.id + "'>" + allAlways.title + "</a></div>";
        return "<div class='row col-xs-12 col-sm-12 number-rectangle'>" + number + "</div>" + row;
    }
    return "<div class='row col-xs-12 col-sm-12 number-rectangle' >" + number + "</div>" +
        firstRow + secondRow;
};

var oneRow = function (firstGroup, secondGroup) {
    if (firstGroup == null) {
        firstGroup = lesson(0," ", " ", " </br> ", " ", " ", " ");
    }
    if (secondGroup == null) {
        secondGroup = lesson(0," ", " ", " </br> ", " ", " ", " ");
    }


    var leftPartFirstRow = "<div class='col-xs-6 col-sm-6 first-group-rectangle'><a href='#/lesson/" + firstGroup.id + "'>" + firstGroup.title + "</a></div>";
    var rightPartFirstRow = "<div class='col-xs-6 col-sm-6 second-group-rectangle'><a href='#/lesson/" + secondGroup.id + "'>" + secondGroup.title + "</a></div>";

    return "<div class='row col-xs-12 col-sm-12 ' >" + leftPartFirstRow + rightPartFirstRow + "</div>";
};
var lesson;
lesson = function (id,number, subGroup, title, professor, place, numerator) {
    var result = new Object();
    result.number = number;
    result.groupType = subGroup;
    result.title = title;
    result.lector = professor;
    result.place = place;
    result.frequency = numerator;
    result.id = id;
    return result;
};

app.directive("scheduleDay", ["GROUP_TYPE", "LESSON_FREQUENCY", function (GROUP_TYPE, LESSON_FREQUENCY) {
    return {

        scope: {
            obj: '='
        },
        link: function (scope, iElement, iAttrs) {
            //  console.log("obj1=" + scope.obj.title);
            //  console.log("obj" + scope.obj);
            var currentNumber = 0;
            var table = "";

            for (var i = 0; i < scope.obj.lessons.length; i++) {
                // console.log("i=="+scope.obj.lessons[i].number +" "+ scope.obj.lessons[i].title);
                var firstGroupNumerator = null;
                var secondGroupNumerator = null;
                var fistGroupAlways = null;

                var firstGroupDenominator = null;
                var secondGroupDenominator = null;
                var secondGroupAlways = null;

                var allNumerator = null;
                var allDenominator = null;
                var allAlways = null;

                if (scope.obj.lessons[i].number != currentNumber) {
                    currentNumber = scope.obj.lessons[i].number;

                    for (var j = i; j < scope.obj.lessons.length; j++) {

                        if (currentNumber == scope.obj.lessons[j].number) {
                            // console.log("j=="+scope.obj.lessons[j].number +" "+ scope.obj.lessons[j].title);
                            switch (scope.obj.lessons[j].groupType) {
                                case GROUP_TYPE.all: {
                                    switch (scope.obj.lessons[j].frequency) {
                                        case LESSON_FREQUENCY.always:
                                            allAlways = scope.obj.lessons[j];
                                            break;
                                        case LESSON_FREQUENCY.denominator:
                                            allDenominator = scope.obj.lessons[j];
                                            break;
                                        case  LESSON_FREQUENCY.numerator :
                                            allNumerator = scope.obj.lessons[j];
                                            break;
                                    }
                                }
                                    break;
                                case GROUP_TYPE.first: {
                                    switch (scope.obj.lessons[j].frequency) {
                                        case LESSON_FREQUENCY.always:
                                            fistGroupAlways = scope.obj.lessons[j];
                                            break;
                                        case LESSON_FREQUENCY.denominator:
                                            firstGroupDenominator = scope.obj.lessons[j];
                                            break;
                                        case  LESSON_FREQUENCY.numerator :
                                            firstGroupNumerator = scope.obj.lessons[j];
                                            break;
                                    }
                                }
                                    break;
                                case GROUP_TYPE.second: {
                                    switch (scope.obj.lessons[j].frequency) {
                                        case LESSON_FREQUENCY.always:
                                            secondGroupAlways = scope.obj.lessons[j];
                                            break;
                                        case LESSON_FREQUENCY.denominator:
                                            secondGroupDenominator = scope.obj.lessons[j];
                                            break;
                                        case  LESSON_FREQUENCY.numerator :
                                            secondGroupNumerator = scope.obj.lessons[j];
                                            break;
                                    }
                                }
                                    break;
                            }

                        }


                    }
                    table += oneNumberLessons(currentNumber, fistGroupAlways, firstGroupNumerator, firstGroupDenominator, secondGroupAlways, secondGroupNumerator, secondGroupDenominator, allAlways, allNumerator, allDenominator);

                }


            }

            iElement.append(angular.element(table));
        }
    }

}]);
