import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { SampleBase } from './sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { DataManager, Query, ODataV4Adaptor, UrlAdaptor, Predicate } from '@syncfusion/ej2-data';

const SERVICE_URI = 'https://js.syncfusion.com/demos/ejServices/api/TreeViewData/GetTreeData';

export class RemoteData extends SampleBase {
  
    constructor() {
        super(...arguments);
        this.data = new DataManager({
          url: SERVICE_URI,
          adaptor: new UrlAdaptor,
          crossDomain: true,
        });
 var predicate = new Predicate('hasChild', 'equal', "true" ,true);
    // Set queries to filter and fetch remote data
    this.query = new Query().where(predicate);
    this.fields = { dataSource: this.data, query: this.query, id: 'id', text: 'name', hasChildren: 'hasChild',
    child: { dataSource: this.data, query: this.query, id: 'id', parentID: 'pid', text: 'name' }
    };
  }

  nodeExpand(args){
    debugger;
  }

    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
        <div className='tree-control_wrapper'>
            <TreeViewComponent fields={this.fields} nodeExpanded={this.nodeExpand.bind(this)} />
        </div>
        </div>
      </div>);
    }
}

render(<RemoteData />, document.getElementById('sample'));