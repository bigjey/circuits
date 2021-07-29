(this.webpackJsonpcircuits=this.webpackJsonpcircuits||[]).push([[0],{13:function(t,n,e){"use strict";(function(t,i){var o=e(5),a=e(9),c=e(15),s=e(14),u=e(2),r=e(1),l=e(4),d=e(7),p=(e(24),e(3)),f=e.n(p),h=e(0),v="circuit-data",y=["e07800","0969d7","b80000","65a300","c31fff","9fb800","00e083"],j=function(){function t(n,e,i){Object(l.a)(this,t),this.position={x:0,y:0},this.state=void 0,this.id=n,this.position.x=e,this.position.y=i}return Object(d.a)(t,[{key:"value",get:function(){return this.state}},{key:"toggle",value:function(){this.state?this.state=0:this.state=1}}],[{key:"fromJS",value:function(n){var e=new t;return e.id=n.id,e.position=n.position,e.state=n.state,e}}]),t}(),g=function(){function t(n,e,i){Object(l.a)(this,t),this.position={x:0,y:0},this.state=void 0,this.id=n,this.position.x=e,this.position.y=i}return Object(d.a)(t,[{key:"value",get:function(){return this.state}}],[{key:"fromJS",value:function(n){var e=new t;return e.id=n.id,e.position=n.position,e.state=n.state,e}}]),t}(),b=1,O=function(){function t(n,e,i,o,a){var c=this;Object(l.a)(this,t),this.inputs=[],this.inputById={},this.outputs=[],this.outputById={},this.gates={},this.connections=new Set,this._inputId=0,this._outputId=0,this.position={x:0,y:0},this.id=b++,this.color=y[this.id%y.length];for(var s=0;s<n;++s){var u=new j("".concat(this.id,":i").concat(this._inputId++),0,0);this.inputById[u.id]=u,this.inputs.push(u.id)}for(var d=0;d<e;++d){var p=new g("".concat(this.id,":o").concat(this._outputId++),0,0);this.outputById[p.id]=p,this.outputs.push(p.id)}var f,h={},v=Object(r.a)(i);try{for(v.s();!(f=v.n()).done;){var O=f.value,m=new O.constructorClass;this.gates[m.id]=m,h[O.oldId]=m}}catch(S){v.e(S)}finally{v.f()}var I,x=Object(r.a)(o);try{for(x.s();!(I=x.n()).done;){var B=I.value,k=void 0,N="";"self-input"===B.source.type?k="".concat(this.id,":i").concat(B.source.oldIndex):"gate-output"===B.source.type?k="".concat(h[B.source.gateId].id,":").concat(B.source.nodeId):console.log("wtf???"),"self-output"===B.destination.type?N="".concat(this.id,":o").concat(B.destination.oldIndex):"gate-input"===B.destination.type?N="".concat(h[B.destination.gateId].id,":").concat(B.destination.nodeId):console.log("wtf???"),this.connections.add("".concat(k,"-").concat(N))}}catch(S){x.e(S)}finally{x.f()}a&&(this.evaluate=function(){return a(c)})}return Object(d.a)(t,[{key:"evaluate",value:function(){for(var t=this,n=0,e=Object.values(this.inputById);n<e.length;n++){var i=e[n];this.allDestinations(i.id).forEach((function(n){return t.updateNode(n)}))}}},{key:"getOutputsState",value:function(){var t,n={},e=Object(r.a)(this.outputs);try{for(e.s();!(t=e.n()).done;){var i=t.value;n[i]=this.outputById[i].value}}catch(o){e.e(o)}finally{e.f()}return n}},{key:"addInput",value:function(t){var n=new j("".concat(this.id,":i").concat(this._inputId++),0,t);this.inputById[n.id]=n,this.inputs.push(n.id)}},{key:"addOutput",value:function(t){var n=new g("".concat(this.id,":o").concat(this._outputId++),0,t);this.outputById[n.id]=n,this.outputs.push(n.id)}},{key:"addGate",value:function(t,n,e){var i=new t(n,e);i.evaluate(),this.gates[i.id]=i}},{key:"addConnection",value:function(t,n){this.connections.add("".concat(t,"-").concat(n)),this.updateNode(n)}},{key:"removeInput",value:function(t){delete this.inputById[t],this.inputs.splice(this.inputs.indexOf(t),1);var n,e=new Set,i=Object(r.a)(this.connections);try{for(i.s();!(n=i.n()).done;){var o=n.value,a=o.split("-"),c=Object(u.a)(a,2),s=c[0],l=c[1];s===t&&(this.connections.delete(o),e.add(l))}}catch(h){i.e(h)}finally{i.f()}var d,p=Object(r.a)(e);try{for(p.s();!(d=p.n()).done;){var f=d.value;this.updateNode(f)}}catch(h){p.e(h)}finally{p.f()}}},{key:"removeOutput",value:function(t){delete this.outputById[t],this.outputs.splice(this.outputs.indexOf(t),1);var n,e=Object(r.a)(this.allSources(t));try{for(e.s();!(n=e.n()).done;){var i=n.value;this.connections.delete("".concat(i,"-").concat(t))}}catch(o){e.e(o)}finally{e.f()}}},{key:"removeGate",value:function(t){for(var n=this,e=this.gates[t],i=function(){var t=a[o];n.allSources(t.id).forEach((function(e){n.connections.delete("".concat(e,"-").concat(t.id))}))},o=0,a=Object.values(e.inputById);o<a.length;o++)i();for(var c=function(){var t=u[s];n.allDestinations(t.id).forEach((function(e){n.connections.delete("".concat(t.id,"-").concat(e)),n.updateNode(e)}))},s=0,u=Object.values(e.outputById);s<u.length;s++)c();delete this.gates[t]}},{key:"allDestinations",value:function(t){var n,e=[],i=Object(r.a)(this.connections.values());try{for(i.s();!(n=i.n()).done;){var o=n.value.split("-"),a=Object(u.a)(o,2),c=a[0],s=a[1];c===t&&e.push(s)}}catch(l){i.e(l)}finally{i.f()}return e}},{key:"allSources",value:function(t){var n,e=[],i=Object(r.a)(this.connections.values());try{for(i.s();!(n=i.n()).done;){var o=n.value.split("-"),a=Object(u.a)(o,2),c=a[0];a[1]===t&&e.push(c)}}catch(s){i.e(s)}finally{i.f()}return e}},{key:"getSourceValue",value:function(t){var n=t.split(":"),e=Object(u.a)(n,1)[0];return this.gates[e]?this.gates[e].outputById[t].value:this.inputById[t]?this.inputById[t].value:(console.log("wtf???",t),0)}},{key:"updateNode",value:function(t){var n=t.split(":"),e=Object(u.a)(n,1)[0];this.gates[e]?this.updateGate(e,t):this.outputById[t]?this.updateOutput(t):console.log("wtf???",t)}},{key:"updateGate",value:function(t,n){var e,i=this.gates[t],o=Object(r.a)(i.inputs);try{for(o.s();!(e=o.n()).done;){var a=e.value;if(a===n){var c=i.inputById[a];c.state=0;var s,u=Object(r.a)(this.allSources(c.id));try{for(u.s();!(s=u.n()).done;){var l=s.value;if(1===this.getSourceValue(l)){c.state=1;break}}}catch(b){u.e(b)}finally{u.f()}}}}catch(b){o.e(b)}finally{o.f()}var d=i.getOutputsState();i.evaluate();i.getOutputsState();var p,f=Object(r.a)(i.outputs);try{for(f.s();!(p=f.n()).done;){var h=p.value,v=i.outputById[h];if(d[h]!==v.value){var y,j=Object(r.a)(this.allDestinations(v.id));try{for(j.s();!(y=j.n()).done;){var g=y.value;this.updateNode(g)}}catch(b){j.e(b)}finally{j.f()}}}}catch(b){f.e(b)}finally{f.f()}}},{key:"updateOutput",value:function(t){var n=this.outputById[t];n.state=0;var e,i=Object(r.a)(this.allSources(t));try{for(i.s();!(e=i.n()).done;){var o=e.value;if(1===this.getSourceValue(o)){n.state=1;break}}}catch(a){i.e(a)}finally{i.f()}}},{key:"transformToGate",value:function(t){for(var n=this.inputs.length,e=this.outputs.length,i=[],o=0,a=Object.values(this.gates);o<a.length;o++){var c=a[o];i.push({constructorClass:c.constructor,constructorName:c.constructor.staticName,oldId:c.id})}var s,l=[],d=Object(r.a)(this.connections);try{for(d.s();!(s=d.n()).done;){var p=s.value.split("-"),f=Object(u.a)(p,2),h=f[0],v=f[1],y={},j=h.split(":"),g=Object(u.a)(j,2),b=g[0],O=g[1],m=v.split(":"),x=Object(u.a)(m,2),B=x[0],k=x[1];this.inputById[h]?y.source={type:"self-input",nodeId:O,oldIndex:this.inputs.indexOf(h)}:this.gates[b]&&(y.source={type:"gate-output",nodeId:O,gateId:b}),this.outputById[v]?y.destination={type:"self-output",nodeId:O,oldIndex:this.outputs.indexOf(v)}:this.gates[B]&&(y.destination={type:"gate-input",nodeId:k,gateId:B}),l.push(y)}}catch(N){d.e(N)}finally{d.f()}return I(t,n,e,i,l)}},{key:"toJS",value:function(){return{inputs:this.inputs,inputById:this.inputById,outputs:this.outputs,outputById:this.outputById,gates:this.gates,connections:Array.from(this.connections),_inputId:this._inputId,_outputId:this._outputId,position:this.position}}},{key:"fromJS",value:function(t){var n=this;this.inputs=t.inputs,this.inputById=Object.values(t.inputById).reduce((function(t,n){return t[n.id]=j.fromJS(n),t}),{}),this.outputs=t.outputs,this.outputById=Object.values(t.outputById).reduce((function(t,n){return t[n.id]=g.fromJS(n),t}),{}),this.connections=new Set(t.connections),this._inputId=t._inputId,this._outputId=t._outputId,this.position=t.position,this.gates=Object.values(t.gates).reduce((function(t,n){var e=Y.concat(A).find((function(t){return t.classPointer.staticName===n.name}));if(e){var i=new e.classPointer(n.position.x,n.position.y);t[i.id]=i}return t}),{}),Object.values(this.gates).forEach((function(t){n.updateGate(t.id)}))}}]),t}(),m=0,I=function(t,n,e,i,o,a){var u,r,d=JSON.stringify({name:t,inputs:n,outputs:e,gates:i,connections:o}),p=(r=u=function(u){Object(c.a)(d,u);var r=Object(s.a)(d);function d(){var c,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(l.a)(this,d),(c=r.call(this,n,e,i,o,a)).name=t,c.position.x=s,c.position.y=u,c}return d}(O),u.initialArgs=d,u.color=y[m++%y.length],r);return p.staticName=t,p},x=function(t){var n=t.input,e=(t.connections,Object(a.a)(t,["input","connections"]));return Object(h.jsx)("div",Object(o.a)(Object(o.a)({id:n.id},e),{},{className:"circuit-input ".concat(1===n.value?"circuit-input-on":""),style:{left:n.position.x,top:n.position.y}}))},B=function(t){var n=t.output,e=(t.connections,Object(a.a)(t,["output","connections"]));return Object(h.jsx)("div",Object(o.a)(Object(o.a)({id:n.id},e),{},{className:"circuit-output ".concat(1===n.value?"circuit-output-on":""),style:{right:n.position.x,top:n.position.y}}))},k=function(t){var n=t.gate,e=(t.connections,t.onConnectionMade),i=t.onRemove;return Object(h.jsxs)("div",{id:n.id,className:"circuit-gate circuit-gate-".concat(n.type),style:{left:n.position.x,top:n.position.y,background:"#".concat(n.constructor.color)},onClick:function(t){t.shiftKey&&(P.removeGate(n.id),i(),t.stopPropagation())},onTouchStart:function(t){},onMouseDown:function(t){G||(G={gateId:n.id,startMousePos:{x:t.clientX,y:t.clientY},startGatePos:{x:n.position.x,y:n.position.y}})},onTouchMove:function(t){},children:[Object(h.jsx)("div",{className:"circuit-gate-inputs",children:Object.values(n.inputById).map((function(t){return Object(h.jsx)("div",{id:t.id,className:"circuit-gate-input ".concat(1===t.value?"circuit-gate-input-on":""),onMouseDown:function(n){E&&(n.stopPropagation(),e(E,t.id))},onMouseUp:function(n){E&&(n.stopPropagation(),e(E,t.id),E=null)},onTouchEnd:function(){}},t.id)}))}),Object(h.jsx)("div",{className:"circuit-gate-name",children:n.name}),Object(h.jsx)("div",{className:"circuit-gate-outputs",children:Object.values(n.outputById).map((function(t){return Object(h.jsx)("div",{id:t.id,className:"circuit-gate-output ".concat(1===t.value?"circuit-gate-output-on":""),onMouseDown:function(n){E||(E=t.id,_.x=n.clientX,_.y=n.clientY,n.stopPropagation())},onTouchStart:function(t){}},t.id)}))})]})},N=function(n){var e,o,a,c,s,r,l,d,p=n.start,v=n.end,y=n.complete,j=void 0!==y&&y,g=f.a.useState(),b=Object(u.a)(g,2)[1],O=f.a.useCallback((function(){b({})}),[]);f.a.useEffect((function(){var n=t(O);return function(){return i(n)}}),[]);var m=document.getElementById(p),I=document.getElementById(v);if(j){if(!m||!I)return null;var x=m.getBoundingClientRect(),B=I.getBoundingClientRect();return e=x.x+x.width/2,o=x.y+x.height/2,s=e+.8*((a=B.x+B.width/2)-e),r=o,l=e+.2*(a-e),d=c=B.y+B.height/2,Object(h.jsx)("path",{fill:"none",d:"M".concat(e,",").concat(o,"\n            C").concat(s,",").concat(r," ").concat(l,",").concat(d,"\n            ").concat(a,",").concat(c)})}if(!m)return null;var k=m.getBoundingClientRect();return e=k.x+k.width/2,o=k.y+k.height/2,a=_.x,c=_.y,Object(h.jsx)("line",{x1:e,y1:o,x2:a,y2:c})},S=function(){try{var t=JSON.stringify({circuit:P.toJS(),customGates:A.map((function(t){return t.classPointer.initialArgs}))});localStorage.setItem(v,t)}catch(n){console.log(n)}};var w=function(){try{var t=localStorage.getItem(v);if(t){var n,e=JSON.parse(t),i=e.customGates.map((function(t){return JSON.parse(t)})),o=Object(r.a)(i);try{for(o.s();!(n=o.n()).done;){var a=n.value,c=I(a.name,a.inputs,a.outputs,a.gates.map((function(t){var n=Y.concat(A).find((function(n){return n.classPointer.staticName===t.constructorName}));return n&&(t.constructorClass=n.classPointer),t})),a.connections);A.push({name:a.name,classPointer:c,id:T++})}}catch(s){o.e(s)}finally{o.f()}P.fromJS(e.circuit)}}catch(u){console.log(u)}},C=(function(t,n){var e}(S,300),I("BASE",0,0,[],[])),P=new C,M=I("AND",2,1,[],[],(function(t){var n=t.inputById[t.inputs[0]],e=t.inputById[t.inputs[1]],i=t.outputById[t.outputs[0]];1===n.value&&1===e.value?i.state=1:i.state=0})),D=I("NOT",1,1,[],[],(function(t){var n=t.inputById[t.inputs[0]],e=t.outputById[t.outputs[0]];1===n.value?e.state=0:e.state=1})),E=null,G=null,J=null,_={x:0,y:0},T=1,Y=[{classPointer:M,name:"AND",id:T++},{classPointer:D,name:"NOT",id:T++}],A=[];n.a=function(){var t=f.a.useState(),n=Object(u.a)(t,2)[1],e=f.a.useCallback((function(){n({})}),[]),i=function(t,n){P.addConnection(t,n),e()};return f.a.useCallback((function(){var t=function(){console.log("drop 2")};return document.addEventListener("drop",t,!1),document.removeEventListener("drop",t,!1)}),[]),Object(h.jsxs)("div",{className:"App",onDragOver:function(t){t.preventDefault()},children:[Object(h.jsxs)("div",{className:"circuit",onDrop:function(t){J&&(P.addGate(J.classPointer,t.clientX,t.clientY),J=null,e())},onMouseDown:function(){E&&(E=null,e())},onMouseUp:function(){G&&(G=null,e())},onTouchEnd:function(){},onMouseMove:function(t){var n=!1;if(E&&(_.x=t.clientX,_.y=t.clientY,n=!0),G){var i=t.clientX-G.startMousePos.x,o=t.clientY-G.startMousePos.y,a=G.startGatePos.x+i,c=G.startGatePos.y+o;P.gates[G.gateId].position.x=a,P.gates[G.gateId].position.y=c,n=!0}n&&e()},onTouchMove:function(t){},children:[Object(h.jsx)("div",{className:"circuit-inputs",onClick:function(t){P.addInput(t.clientY-20),e()},children:Object.values(P.inputById).map((function(t){return Object(h.jsx)(x,{input:t,connections:P.connections,onMouseDown:function(n){n.stopPropagation(),E||(E=t.id,_.x=n.clientX,_.y=n.clientY)},onMouseUp:function(t){t.stopPropagation()},onClick:function(n){n.stopPropagation(),n.shiftKey?P.removeInput(t.id):n.ctrlKey?(E=t.id,_.x=n.clientX,_.y=n.clientY):(E=null,t.toggle(),P.allDestinations(t.id).forEach((function(t){P.updateNode(t)}))),e()},onTouchStart:function(){}},t.id)}))}),Object(h.jsx)("div",{className:"circuit-outputs",onClick:function(t){t.stopPropagation(),P.addOutput(t.clientY-20),e()},children:Object.values(P.outputById).map((function(t){return Object(h.jsx)(B,{output:t,connections:P.connections,onClick:function(n){n.stopPropagation(),n.shiftKey&&P.removeOutput(t.id),e()},onMouseUp:function(){E&&i(E,t.id),E=null},onTouchEnd:function(){}},t.id)}))}),Object.values(P.gates).map((function(t){return Object(h.jsx)(k,{gate:t,connections:P.connections,onConnectionMade:i,onRemove:function(){return e()}},t.id)})),Object(h.jsxs)("svg",{onDrop:function(){console.log("on drop")},children:[Array.from(P.connections).map((function(t){var n=t.split("-"),e=Object(u.a)(n,2),i=e[0],o=e[1];return Object(h.jsx)(N,{complete:!0,start:i,end:o},t)})),E&&Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(N,{start:E})})]})]}),Object(h.jsxs)("div",{className:"tools",children:[Object(h.jsxs)("div",{className:"tools-save",children:[Object(h.jsx)("input",{id:"gate-name",className:"tools-save-name",placeholder:"New gate name"}),Object(h.jsx)("button",{className:"tools-save-submit",onClick:function(t){var n=document.getElementById("gate-name");if(n.value.length){var i=P.transformToGate(n.value);A.push({name:n.value,classPointer:i,id:T++}),n.value="",P=new C,e()}},children:"Create"})]}),Object(h.jsx)("div",{className:"tools-gates",children:Y.concat(A).map((function(t){return Object(h.jsx)("button",{className:"tools-gate",style:{background:"#".concat(t.classPointer.color)},onClick:function(n){P.addGate(t.classPointer,50,20),e()},draggable:"true",onDragStart:function(n){J=t},children:t.name},t.name)}))})]}),Object(h.jsxs)("div",{className:"state-manager",children:[Object(h.jsx)("br",{}),Object(h.jsx)("button",{onClick:function(){P=new C,e()},children:"Reset Current Curcuit"}),Object(h.jsx)("button",{onClick:function(){localStorage.removeItem(v),window.location.reload()},children:"Reset Whole State"}),Object(h.jsx)("br",{}),"(buggy atm):",Object(h.jsx)("button",{onClick:function(){S()},children:"Save State"}),Object(h.jsx)("button",{onClick:function(){w(),e()},children:"Load State"})]})]})}}).call(this,e(10).setImmediate,e(10).clearImmediate)},16:function(t,n,e){"use strict";e.r(n);var i=e(3),o=e.n(i),a=e(12),c=e.n(a),s=(e(21),e(13)),u=e(0);c.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(s.a,{})}),document.getElementById("root"))},21:function(t,n,e){},24:function(t,n,e){}},[[16,1,2]]]);
//# sourceMappingURL=main.d9359a1f.chunk.js.map