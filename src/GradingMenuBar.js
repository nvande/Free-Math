import React from 'react';
import createReactClass from 'create-react-class';
import './App.css';
import LogoHomeNav from './LogoHomeNav.js';
import { saveGradedStudentWork } from './TeacherInteractiveGrader.js';

var SET_TO_VIEW_GRADES = 'SET_TO_VIEW_GRADES';
var NAV_BACK_TO_GRADING = 'NAV_BACK_TO_GRADING';

var ASSIGNMENT_NAME = 'ASSIGNMENT_NAME';
var SET_ASSIGNMENT_NAME = 'SET_ASSIGNMENT_NAME';

function scrollToTop() {
    //window.location.hash = '';
    // this method doesn't mess with history
    window.history.replaceState(window.store.getState(), undefined, "#");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
};

const GradingMenuBar = createReactClass({
    render: function() {
        var assignmentName = this.props.value[ASSIGNMENT_NAME];
        if (typeof(assignmentName) === "undefined" || assignmentName == null) {
            assignmentName = "";
        }
        return (
            <div className="menuBar">
                <div className="nav">
                    <LogoHomeNav /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{float:"left", verticalAlign:"top", marginTop:"5px", lineHeight : 1}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Assignment Name &nbsp;&nbsp;
                        <input type="text" id="assignment-name-text" size="35" name="assignment name" value={this.props.value[ASSIGNMENT_NAME]} onChange={
                            function(evt) {
                                window.store.dispatch({type : SET_ASSIGNMENT_NAME, ASSIGNMENT_NAME : evt.target.value});
                            }}
                        />&nbsp;&nbsp;
                        <input type="submit" id="save-graded-assignments" value="Save graded" onClick={
                            function() {
                                saveGradedStudentWork(window.store.getState());
                            }
                        }/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="submit" id="view-grades" value="View grades" onClick={
                            function() {
                                scrollToTop();
			        window.store.dispatch({type : SET_TO_VIEW_GRADES});
                                window.history.pushState(window.store.getState(), null, "/");
			    }
                        }/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="submit" id="scroll-to-top" value="Scroll to top" onClick={scrollToTop} />
                    </div>
                </div>
            </div>
        );
    }
});

export const ModalWhileGradingMenuBar = createReactClass({
    render: function() {
        return (
            <div className="menuBar">
                <div className="nav">
                    <LogoHomeNav /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{float:"left", verticalAlign:"top", marginTop:"5px", lineHeight : 1}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="submit" id="back-to-grading" value="Back to grading" onClick={
                            function() {window.store.dispatch({type : NAV_BACK_TO_GRADING})}
                        }/>
                    </div>
                </div>
            </div>
        );
    }
});

export { GradingMenuBar as default,
        scrollToTop
};
