import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { SampleBase } from './sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

export class RemoteData extends SampleBase {
    constructor() {
        super(...arguments);
        // Use data manager to get tree data from remote source
        this.data = new DataManager({
            url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
            adaptor: new ODataV4Adaptor,
            crossDomain: true,
        });
        // Set queries to filter and fetch remote data
        this.query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
        this.query1 = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
        this.fields = { dataSource: this.data, query: this.query, id: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
            child: { dataSource: this.data, query: this.query1, id: 'OrderID', parentID: 'EmployeeID', text: 'ShipName' }
        };
    }
    // Show loading message, while loading tree data
    show() {
        let popup = document.getElementById('loading');
        popup.style.display = '';
    }
    // Hide loading message, after tree data has been loaded
    hide() {
        let popup = document.getElementById('loading');
        popup.style.display = 'none';
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
        <div className='tree-control_wrapper'>
            <span id="loading">Loading...</span>
            <TreeViewComponent fields={this.fields} dataBound={this.hide.bind(this)} created={this.show.bind(this)}/>
        </div>
        </div>
      </div>);
    }
}

render(<RemoteData />, document.getElementById('sample'));