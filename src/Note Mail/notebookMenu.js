import React, { Component } from 'react';
import "./notebookMenu.css";
import DeviceOrientation, { Orientation } from 'react-screen-orientation'

class notebookMenu extends Component{

    render(){
        return(
            <DeviceOrientation lockOrientation={'landscape'}>
                <Orientation orientation='landscape' alwaysRender={false}>
                    <div className="notebookMenu_horizontal">
                        
                    </div>
                </Orientation>
                <Orientation orientation='portrait' alwaysRender={false}>
                    <div className="notebookMenu_vertical">
                        
                    </div>
                </Orientation>
            </DeviceOrientation>
        )
    }
}

export default notebookMenu;