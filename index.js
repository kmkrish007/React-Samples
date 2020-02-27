import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { SampleBase } from './sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { DataManager, Query, ODataV4Adaptor, UrlAdaptor } from '@syncfusion/ej2-data';

const SERVICE_URI = 'https://js.syncfusion.com/demos/ejServices/api/TreeViewData/GetTreeData';

export class RemoteData extends SampleBase {
  
    constructor() {
        super(...arguments);
        this.data = new DataManager({
          url: SERVICE_URI,
          adaptor: new UrlAdaptor,
          crossDomain: true,
        });

    // Set queries to filter and fetch remote data
    this.query = new Query().take(5);
    this.fields = { dataSource: this.data, query: this.query, id: 'id', text: 'name', hasChildren: 'hasChild',
    child: { dataSource: this.data, query: this.query, id: 'id', parentID: 'pid', text: 'name' }
    };
  }

    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
        <div className='tree-control_wrapper'>
            <TreeViewComponent fields={this.fields} />
        </div>
        </div>
      </div>);
    }
}

render(<RemoteData />, document.getElementById('sample'));