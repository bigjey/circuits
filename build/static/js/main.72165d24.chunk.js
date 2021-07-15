(this.webpackJsonpcircuits=this.webpackJsonpcircuits||[]).push([[0],{12:function(t,e,n){"use strict";(function(t){var i=n(5),o=n(9),s=n(14),a=n(13),c=n(2),u=n(1),r=n(4),l=n(7),d=(n(24),n(3)),p=n.n(d),h=n(0),f="circuit-data",v=["e07800","0969d7","b80000","65a300","c31fff","9fb800","00e083"],y=function(){function t(e,n,i){Object(r.a)(this,t),this.position={x:0,y:0},this.state=0,this.id=e,this.position.x=n,this.position.y=i}return Object(l.a)(t,[{key:"value",get:function(){return this.state}},{key:"toggle",value:function(){0===this.state?this.state=1:this.state=0}}],[{key:"fromJS",value:function(e){var n=new t;return n.id=e.id,n.position=e.position,n.state=e.state,n}}]),t}(),j=function(){function t(e,n,i){Object(r.a)(this,t),this.position={x:0,y:0},this.state=0,this.id=e,this.position.x=n,this.position.y=i}return Object(l.a)(t,[{key:"value",get:function(){return this.state}}],[{key:"fromJS",value:function(e){var n=new t;return n.id=e.id,n.position=e.position,n.state=e.state,n}}]),t}(),g=1,O=function(){function t(e,n,i,o,s){var a=this;Object(r.a)(this,t),this.inputs=[],this.inputById={},this.outputs=[],this.outputById={},this.gates={},this.connections=new Set,this._inputId=0,this._outputId=0,this.position={x:0,y:0},this.id=g++,this.color=v[this.id%v.length];for(var c=0;c<e;++c){var l=new y("".concat(this.id,":i").concat(this._inputId++),0,0);this.inputById[l.id]=l,this.inputs.push(l.id)}for(var d=0;d<n;++d){var p=new j("".concat(this.id,":o").concat(this._outputId++),0,0);this.outputById[p.id]=p,this.outputs.push(p.id)}var h,f={},O=Object(u.a)(i);try{for(O.s();!(h=O.n()).done;){var b=h.value,m=new b.constructorClass;this.gates[m.id]=m,f[b.oldId]=m}}catch(S){O.e(S)}finally{O.f()}var I,x=Object(u.a)(o);try{for(x.s();!(I=x.n()).done;){var B=I.value,N=void 0,k="";"self-input"===B.source.type?N="".concat(this.id,":i").concat(B.source.oldIndex):"gate-output"===B.source.type?N="".concat(f[B.source.gateId].id,":").concat(B.source.nodeId):console.log("wtf???"),"self-output"===B.destination.type?k="".concat(this.id,":o").concat(B.destination.oldIndex):"gate-input"===B.destination.type?k="".concat(f[B.destination.gateId].id,":").concat(B.destination.nodeId):console.log("wtf???"),this.connections.add("".concat(N,"-").concat(k))}}catch(S){x.e(S)}finally{x.f()}s&&(this.evaluate=function(){return s(a)}),this.evaluate()}return Object(l.a)(t,[{key:"evaluate",value:function(){for(var t=this,e=0,n=Object.values(this.inputById);e<n.length;e++){var i=n[e];this.allDestinations(i.id).forEach((function(e){return t.updateNode(e)}))}}},{key:"addInput",value:function(t){var e=new y("".concat(this.id,":i").concat(this._inputId++),0,t);this.inputById[e.id]=e,this.inputs.push(e.id)}},{key:"addOutput",value:function(t){var e=new j("".concat(this.id,":o").concat(this._outputId++),0,t);this.outputById[e.id]=e,this.outputs.push(e.id)}},{key:"addGate",value:function(t,e,n){var i=new t(e,n);this.gates[i.id]=i}},{key:"addConnection",value:function(t,e){this.connections.add("".concat(t,"-").concat(e)),this.updateNode(e)}},{key:"removeInput",value:function(t){delete this.inputById[t],this.inputs.splice(this.inputs.indexOf(t),1);var e,n=new Set,i=Object(u.a)(this.connections);try{for(i.s();!(e=i.n()).done;){var o=e.value,s=o.split("-"),a=Object(c.a)(s,2),r=a[0],l=a[1];r===t&&(this.connections.delete(o),n.add(l))}}catch(f){i.e(f)}finally{i.f()}var d,p=Object(u.a)(n);try{for(p.s();!(d=p.n()).done;){var h=d.value;this.updateNode(h)}}catch(f){p.e(f)}finally{p.f()}}},{key:"removeOutput",value:function(t){delete this.outputById[t],this.outputs.splice(this.outputs.indexOf(t),1);var e,n=Object(u.a)(this.allSources(t));try{for(n.s();!(e=n.n()).done;){var i=e.value;this.connections.delete("".concat(i,"-").concat(t))}}catch(o){n.e(o)}finally{n.f()}}},{key:"removeGate",value:function(t){for(var e=this,n=this.gates[t],i=function(){var t=s[o];e.allSources(t.id).forEach((function(n){e.connections.delete("".concat(n,"-").concat(t.id))}))},o=0,s=Object.values(n.inputById);o<s.length;o++)i();for(var a=function(){var t=u[c];e.allDestinations(t.id).forEach((function(n){e.connections.delete("".concat(t.id,"-").concat(n)),e.updateNode(n)}))},c=0,u=Object.values(n.outputById);c<u.length;c++)a();delete this.gates[t]}},{key:"allDestinations",value:function(t){var e,n=[],i=Object(u.a)(this.connections.values());try{for(i.s();!(e=i.n()).done;){var o=e.value.split("-"),s=Object(c.a)(o,2),a=s[0],r=s[1];a===t&&n.push(r)}}catch(l){i.e(l)}finally{i.f()}return n}},{key:"allSources",value:function(t){var e,n=[],i=Object(u.a)(this.connections.values());try{for(i.s();!(e=i.n()).done;){var o=e.value.split("-"),s=Object(c.a)(o,2),a=s[0];s[1]===t&&n.push(a)}}catch(r){i.e(r)}finally{i.f()}return n}},{key:"getSourceValue",value:function(t){var e=t.split(":"),n=Object(c.a)(e,1)[0];return this.gates[n]?this.gates[n].outputById[t].value:this.inputById[t]?this.inputById[t].value:(console.log("wtf???",t),0)}},{key:"updateNode",value:function(t){var e=t.split(":"),n=Object(c.a)(e,1)[0];this.gates[n]?this.updateGate(n):this.outputById[t]?this.updateOutput(t):console.log("wtf???",t)}},{key:"updateGate",value:function(t){var e,n=this.gates[t],i=Object(u.a)(n.inputs);try{for(i.s();!(e=i.n()).done;){var o=e.value,s=n.inputById[o];s.state=0;var a,c=Object(u.a)(this.allSources(s.id));try{for(c.s();!(a=c.n()).done;){var r=a.value;if(1===this.getSourceValue(r)){s.state=1;break}}}catch(j){c.e(j)}finally{c.f()}}}catch(j){i.e(j)}finally{i.f()}n.evaluate();var l,d=Object(u.a)(n.outputs);try{for(d.s();!(l=d.n()).done;){var p,h=l.value,f=n.outputById[h],v=Object(u.a)(this.allDestinations(f.id));try{for(v.s();!(p=v.n()).done;){var y=p.value;this.updateNode(y)}}catch(j){v.e(j)}finally{v.f()}}}catch(j){d.e(j)}finally{d.f()}}},{key:"updateOutput",value:function(t){var e=this.outputById[t];e.state=0;var n,i=Object(u.a)(this.allSources(t));try{for(i.s();!(n=i.n()).done;){var o=n.value;if(1===this.getSourceValue(o)){e.state=1;break}}}catch(s){i.e(s)}finally{i.f()}}},{key:"transformToGate",value:function(t){for(var e=this.inputs.length,n=this.outputs.length,i=[],o=0,s=Object.values(this.gates);o<s.length;o++){var a=s[o];i.push({constructorClass:a.constructor,constructorName:a.constructor.staticName,oldId:a.id})}var r,l=[],d=Object(u.a)(this.connections);try{for(d.s();!(r=d.n()).done;){var p=r.value.split("-"),h=Object(c.a)(p,2),f=h[0],v=h[1],y={},j=f.split(":"),g=Object(c.a)(j,2),O=g[0],b=g[1],I=v.split(":"),x=Object(c.a)(I,2),B=x[0],N=x[1];this.inputById[f]?y.source={type:"self-input",nodeId:b,oldIndex:this.inputs.indexOf(f)}:this.gates[O]&&(y.source={type:"gate-output",nodeId:b,gateId:O}),this.outputById[v]?y.destination={type:"self-output",nodeId:b,oldIndex:this.outputs.indexOf(v)}:this.gates[B]&&(y.destination={type:"gate-input",nodeId:N,gateId:B}),l.push(y)}}catch(k){d.e(k)}finally{d.f()}return m(t,e,n,i,l)}},{key:"toJS",value:function(){return{inputs:this.inputs,inputById:this.inputById,outputs:this.outputs,outputById:this.outputById,gates:this.gates,connections:Array.from(this.connections),_inputId:this._inputId,_outputId:this._outputId,position:this.position}}},{key:"fromJS",value:function(t){var e=this;this.inputs=t.inputs,this.inputById=Object.values(t.inputById).reduce((function(t,e){return t[e.id]=y.fromJS(e),t}),{}),this.outputs=t.outputs,this.outputById=Object.values(t.outputById).reduce((function(t,e){return t[e.id]=j.fromJS(e),t}),{}),this.connections=new Set(t.connections),this._inputId=t._inputId,this._outputId=t._outputId,this.position=t.position,this.gates=Object.values(t.gates).reduce((function(t,e){var n=E.concat(D).find((function(t){return t.classPointer.staticName===e.name}));if(n){var i=new n.classPointer(e.position.x,e.position.y);t[i.id]=i}return t}),{}),Object.values(this.gates).forEach((function(t){e.updateGate(t.id)}))}}]),t}(),b=0,m=function(t,e,n,i,o,c){var u,l,d=JSON.stringify({name:t,inputs:e,outputs:n,gates:i,connections:o}),p=(l=u=function(u){Object(s.a)(d,u);var l=Object(a.a)(d);function d(){var s,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(r.a)(this,d),(s=l.call(this,e,n,i,o,c)).name=t,s.position.x=a,s.position.y=u,s}return d}(O),u.initialArgs=d,u.color=v[b++%v.length],l);return p.staticName=t,p},I=function(t){var e=t.input,n=(t.connections,Object(o.a)(t,["input","connections"]));return Object(h.jsx)("div",Object(i.a)(Object(i.a)({id:e.id},n),{},{className:"circuit-input ".concat(1===e.value?"circuit-input-on":""),style:{left:e.position.x,top:e.position.y}}))},x=function(t){var e=t.output,n=(t.connections,Object(o.a)(t,["output","connections"]));return Object(h.jsx)("div",Object(i.a)(Object(i.a)({id:e.id},n),{},{className:"circuit-output ".concat(1===e.value?"circuit-output-on":""),style:{right:e.position.x,top:e.position.y}}))},B=function(t){var e=t.gate,n=(t.connections,t.onConnectionMade),i=t.onRemove;return Object(h.jsxs)("div",{id:e.id,className:"circuit-gate circuit-gate-".concat(e.type),style:{left:e.position.x,top:e.position.y,background:"#".concat(e.constructor.color)},onClick:function(t){t.shiftKey&&(w.removeGate(e.id),i(),t.stopPropagation())},onMouseDown:function(t){J||(J={gateId:e.id,startMousePos:{x:t.clientX,y:t.clientY},startGatePos:{x:e.position.x,y:e.position.y}})},children:[Object(h.jsx)("div",{className:"circuit-gate-inputs",children:Object.values(e.inputById).map((function(t){return Object(h.jsx)("div",{id:t.id,className:"circuit-gate-input ".concat(1===t.value?"circuit-gate-input-on":""),onMouseUp:function(){G&&n(G,t.id),G=null}},t.id)}))}),Object(h.jsx)("div",{className:"circuit-gate-name",children:e.name}),Object(h.jsx)("div",{className:"circuit-gate-outputs",children:Object.values(e.outputById).map((function(t){return Object(h.jsx)("div",{id:t.id,className:"circuit-gate-output ".concat(1===t.value?"circuit-gate-output-on":""),onMouseDown:function(e){G||(G=t.id,e.stopPropagation())}},t.id)}))})]})},N=function(e){var n,i,o,s,a=e.start,u=e.end,r=e.complete,l=void 0!==r&&r,d=p.a.useState(),f=Object(c.a)(d,2)[1],v=p.a.useCallback((function(){f({})}),[]);p.a.useEffect((function(){t(v)}),[]);var y=document.getElementById(a),j=document.getElementById(u);if(l){if(!y||!j)return null;var g=y.getBoundingClientRect(),O=j.getBoundingClientRect();n=g.x+g.width/2,i=g.y+g.height/2,o=O.x+O.width/2,s=O.y+O.height/2}else{if(!y)return null;var b=y.getBoundingClientRect();n=b.x+b.width/2,i=b.y+b.height/2,o=M.x,s=M.y}return Object(h.jsx)("line",{x1:n,y1:i,x2:o,y2:s})},k=function(t,e){var n;return function(){clearTimeout(n),n=setTimeout(t,n)}}((function(){try{var t=JSON.stringify({circuit:w.toJS(),customGates:D.map((function(t){return t.classPointer.initialArgs}))});localStorage.setItem(f,t)}catch(e){console.log(e)}}));var S=m("BASE",0,0,[],[]),w=new S,C=m("AND",2,1,[],[],(function(t){var e=t.inputById[t.inputs[0]],n=t.inputById[t.inputs[1]],i=t.outputById[t.outputs[0]];1===e.value&&1===n.value?i.state=1:i.state=0})),P=m("NOT",1,1,[],[],(function(t){var e=t.inputById[t.inputs[0]],n=t.outputById[t.outputs[0]];1===e.value?n.state=0:n.state=1})),G=null,J=null,M={x:0,y:0},_=1,E=[{classPointer:C,name:"AND",id:_++},{classPointer:P,name:"NOT",id:_++}],D=[];try{var A=localStorage.getItem(f);if(A){var T,R=JSON.parse(A),Y=R.customGates.map((function(t){return JSON.parse(t)})),K=Object(u.a)(Y);try{for(K.s();!(T=K.n()).done;){var U=T.value,V=m(U.name,U.inputs,U.outputs,U.gates.map((function(t){var e=E.concat(D).find((function(e){return e.classPointer.staticName===t.constructorName}));return e&&(t.constructorClass=e.classPointer),t})),U.connections);D.push({name:U.name,classPointer:V,id:_++})}}catch(X){K.e(X)}finally{K.f()}w.fromJS(R.circuit)}}catch(F){console.log(F)}e.a=function(){var t=p.a.useState(),e=Object(c.a)(t,2)[1],n=p.a.useCallback((function(){k(),e({})}),[]),i=function(t,e){w.addConnection(t,e),n()};return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsxs)("div",{className:"circuit",onMouseUp:function(){G=null,J=null,n()},onMouseMove:function(t){if(G&&(M.x=t.clientX,M.y=t.clientY,n()),J){var e=t.clientX-J.startMousePos.x,i=t.clientY-J.startMousePos.y,o=J.startGatePos.x+e,s=J.startGatePos.y+i;w.gates[J.gateId].position.x=o,w.gates[J.gateId].position.y=s,n()}},children:[Object(h.jsx)("div",{className:"circuit-inputs",onClick:function(t){w.addInput(t.clientY-20),n()}}),Object(h.jsx)("div",{className:"circuit-outputs",onClick:function(t){w.addOutput(t.clientY-20),n()}}),Object.values(w.inputById).map((function(t){return Object(h.jsx)(I,{input:t,connections:w.connections,onClick:function(e){e.shiftKey?w.removeInput(t.id):(t.toggle(),w.allDestinations(t.id).forEach((function(t){return w.updateNode(t)}))),n()},onMouseDown:function(){G||(G=t.id)}},t.id)})),Object.values(w.outputById).map((function(t){return Object(h.jsx)(x,{output:t,connections:w.connections,onClick:function(e){e.shiftKey&&w.removeOutput(t.id),n()},onMouseUp:function(){G&&i(G,t.id),G=null}},t.id)})),Object.values(w.gates).map((function(t){return Object(h.jsx)(B,{gate:t,connections:w.connections,onConnectionMade:i,onRemove:function(){return n()}},t.id)})),Object(h.jsxs)("svg",{children:[Array.from(w.connections).map((function(t){var e=t.split("-"),n=Object(c.a)(e,2),i=n[0],o=n[1];return Object(h.jsx)(N,{complete:!0,start:i,end:o},t)})),G&&Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(N,{start:G})})]})]}),Object(h.jsxs)("div",{className:"tools",children:[Object(h.jsxs)("div",{className:"tools-save",children:[Object(h.jsx)("input",{id:"gate-name",className:"tools-save-name",placeholder:"New gate name"}),Object(h.jsx)("button",{className:"tools-save-submit",onClick:function(t){var e=document.getElementById("gate-name");if(e.value.length){var i=w.transformToGate(e.value);D.push({name:e.value,classPointer:i,id:_++}),e.value="",w=new S,n()}},children:"Create"})]}),Object(h.jsxs)("div",{className:"tools-gates",children:[E.map((function(t){return Object(h.jsx)("div",{children:Object(h.jsx)("button",{className:"tools-gate",style:{background:"#".concat(t.classPointer.color)},onClick:function(e){w.addGate(t.classPointer,50,20),n()},children:t.name},t.name)})})),D.map((function(t){return Object(h.jsx)("div",{children:Object(h.jsx)("button",{className:"tools-gate",style:{background:"#".concat(t.classPointer.color)},onClick:function(e){e.shiftKey?D.splice(D.indexOf(t),1):w.addGate(t.classPointer,50,20),n()},children:t.name},t.name)})}))]})]})]})}}).call(this,n(21).setImmediate)},15:function(t,e,n){"use strict";n.r(e);var i=n(3),o=n.n(i),s=n(11),a=n.n(s),c=(n(20),n(12)),u=n(0);a.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(c.a,{})}),document.getElementById("root"))},20:function(t,e,n){},24:function(t,e,n){}},[[15,1,2]]]);
//# sourceMappingURL=main.72165d24.chunk.js.map