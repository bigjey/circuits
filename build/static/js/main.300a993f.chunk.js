(this.webpackJsonpcircuits=this.webpackJsonpcircuits||[]).push([[0],{17:function(t,e,n){},18:function(t,e,n){},20:function(t,e,n){"use strict";n.r(e);var i=n(3),a=n.n(i),s=n(10),o=n.n(s),c=(n(17),n(5)),u=n(9),l=n(12),r=n(11),d=n(2),p=n(1),h=n(4),v=n(7),f=(n(18),n(0)),y=function(){function t(e,n,i){Object(h.a)(this,t),this.position={x:0,y:0},this.state=0,this.id=e,this.position.x=n,this.position.y=i}return Object(v.a)(t,[{key:"value",get:function(){return this.state}},{key:"toggle",value:function(){0===this.state?this.state=1:this.state=0}}]),t}(),j=function(){function t(e,n,i){Object(h.a)(this,t),this.position={x:0,y:0},this.state=0,this.id=e,this.position.x=n,this.position.y=i}return Object(v.a)(t,[{key:"value",get:function(){return this.state}}]),t}(),O=1,b=function(){function t(e,n,i,a,s){var o=this;Object(h.a)(this,t),this.inputs=[],this.inputById={},this.outputs=[],this.outputById={},this.gates={},this.connections=new Set,this._inputId=0,this._outputId=0,this.position={x:0,y:0},this.id=O++;for(var c=0;c<e;++c){var u=new y("".concat(this.id,":i").concat(this._inputId++),0,0);this.inputById[u.id]=u,this.inputs.push(u.id)}for(var l=0;l<n;++l){var r=new j("".concat(this.id,":o").concat(this._outputId++),0,0);this.outputById[r.id]=r,this.outputs.push(r.id)}var d,v={},f=Object(p.a)(i);try{for(f.s();!(d=f.n()).done;){var b=d.value,g=new b.constructorClass;this.gates[g.id]=g,v[b.oldId]=g}}catch(k){f.e(k)}finally{f.f()}var x,I=Object(p.a)(a);try{for(I.s();!(x=I.n()).done;){var m=x.value,B=void 0,N="";"self-input"===m.source.type?B="".concat(this.id,":i").concat(m.source.oldIndex):"gate-output"===m.source.type?B="".concat(v[m.source.gateId].id,":").concat(m.source.nodeId):console.log("wtf???"),"self-output"===m.destination.type?N="".concat(this.id,":o").concat(m.destination.oldIndex):"gate-input"===m.destination.type?N="".concat(v[m.destination.gateId].id,":").concat(m.destination.nodeId):console.log("wtf???"),this.connections.add("".concat(B,"-").concat(N))}}catch(k){I.e(k)}finally{I.f()}s&&(this.evaluate=function(){return s(o)}),this.evaluate()}return Object(v.a)(t,[{key:"evaluate",value:function(){for(var t=this,e=0,n=Object.values(this.inputById);e<n.length;e++){var i=n[e];this.allDestinations(i.id).forEach((function(e){return t.updateNode(e)}))}}},{key:"addInput",value:function(t){var e=new y("".concat(this.id,":i").concat(this._inputId++),0,t);this.inputById[e.id]=e,this.inputs.push(e.id)}},{key:"addOutput",value:function(t){var e=new j("".concat(this.id,":o").concat(this._outputId++),0,t);this.outputById[e.id]=e,this.outputs.push(e.id)}},{key:"addGate",value:function(t,e,n){var i=new t(e,n);this.gates[i.id]=i}},{key:"addConnection",value:function(t,e){this.connections.add("".concat(t,"-").concat(e)),this.updateNode(e)}},{key:"removeInput",value:function(t){delete this.inputById[t],this.inputs.splice(this.inputs.indexOf(t));var e,n=new Set,i=Object(p.a)(this.connections);try{for(i.s();!(e=i.n()).done;){var a=e.value,s=a.split("-"),o=Object(d.a)(s,2),c=o[0],u=o[1];c===t&&(this.connections.delete(a),n.add(u))}}catch(v){i.e(v)}finally{i.f()}var l,r=Object(p.a)(n);try{for(r.s();!(l=r.n()).done;){var h=l.value;this.updateNode(h)}}catch(v){r.e(v)}finally{r.f()}}},{key:"removeOutput",value:function(t){delete this.outputById[t],this.outputs.splice(this.outputs.indexOf(t));var e,n=Object(p.a)(this.allSources(t));try{for(n.s();!(e=n.n()).done;){var i=e.value;this.connections.delete("".concat(i,"-").concat(t))}}catch(a){n.e(a)}finally{n.f()}}},{key:"allDestinations",value:function(t){var e,n=[],i=Object(p.a)(this.connections.values());try{for(i.s();!(e=i.n()).done;){var a=e.value.split("-"),s=Object(d.a)(a,2),o=s[0],c=s[1];o===t&&n.push(c)}}catch(u){i.e(u)}finally{i.f()}return n}},{key:"allSources",value:function(t){var e,n=[],i=Object(p.a)(this.connections.values());try{for(i.s();!(e=i.n()).done;){var a=e.value.split("-"),s=Object(d.a)(a,2),o=s[0];s[1]===t&&n.push(o)}}catch(c){i.e(c)}finally{i.f()}return n}},{key:"getSourceValue",value:function(t){var e=t.split(":"),n=Object(d.a)(e,1)[0];return this.gates[n]?this.gates[n].outputById[t].value:this.inputById[t]?this.inputById[t].value:(console.log("wtf???",t),0)}},{key:"updateNode",value:function(t){var e=t.split(":"),n=Object(d.a)(e,1)[0];this.gates[n]?this.updateGate(n):this.outputById[t]?this.updateOutput(t):console.log("wtf???",t)}},{key:"updateGate",value:function(t){var e,n=this.gates[t],i=Object(p.a)(n.inputs);try{for(i.s();!(e=i.n()).done;){var a=e.value,s=n.inputById[a];s.state=0;var o,c=Object(p.a)(this.allSources(s.id));try{for(c.s();!(o=c.n()).done;){var u=o.value;if(1===this.getSourceValue(u)){s.state=1;break}}}catch(j){c.e(j)}finally{c.f()}}}catch(j){i.e(j)}finally{i.f()}n.evaluate();var l,r=Object(p.a)(n.outputs);try{for(r.s();!(l=r.n()).done;){var d,h=l.value,v=n.outputById[h],f=Object(p.a)(this.allDestinations(v.id));try{for(f.s();!(d=f.n()).done;){var y=d.value;this.updateNode(y)}}catch(j){f.e(j)}finally{f.f()}}}catch(j){r.e(j)}finally{r.f()}}},{key:"updateOutput",value:function(t){var e=this.outputById[t];e.state=0;var n,i=Object(p.a)(this.allSources(t));try{for(i.s();!(n=i.n()).done;){var a=n.value;if(1===this.getSourceValue(a)){e.state=1;break}}}catch(s){i.e(s)}finally{i.f()}}},{key:"transformToGate",value:function(t){for(var e=this.inputs.length,n=this.outputs.length,i=[],a=0,s=Object.values(this.gates);a<s.length;a++){var o=s[a];i.push({constructorClass:o.constructor,oldId:o.id})}var c,u=[],l=Object(p.a)(this.connections);try{for(l.s();!(c=l.n()).done;){var r=c.value.split("-"),h=Object(d.a)(r,2),v=h[0],f=h[1],y={},j=v.split(":"),O=Object(d.a)(j,2),b=O[0],x=O[1],I=f.split(":"),m=Object(d.a)(I,2),B=m[0],N=m[1];this.inputById[v]?y.source={type:"self-input",nodeId:x,oldIndex:this.inputs.indexOf(v)}:this.gates[b]&&(y.source={type:"gate-output",nodeId:x,gateId:b}),this.outputById[f]?y.destination={type:"self-output",nodeId:x,oldIndex:this.outputs.indexOf(f)}:this.gates[B]&&(y.destination={type:"gate-input",nodeId:N,gateId:B}),u.push(y)}}catch(k){l.e(k)}finally{l.f()}return console.log("create class",{name:t,inputsCount:e,outputsCount:n,gates:i,connections:u}),g(t,e,n,i,u)}}]),t}(),g=function(t,e,n,i,a,s){return function(o){Object(l.a)(u,o);var c=Object(r.a)(u);function u(){var o,l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(h.a)(this,u),(o=c.call(this,e,n,i,a,s)).name=t,o.position.x=l,o.position.y=r,o}return u}(b)},x=function(t){var e=t.input,n=(t.connections,Object(u.a)(t,["input","connections"]));return Object(f.jsx)("div",Object(c.a)(Object(c.a)({id:e.id},n),{},{className:"circuit-input ".concat(1===e.value?"circuit-input-on":""),style:{left:e.position.x,top:e.position.y}}))},I=function(t){var e=t.output,n=(t.connections,Object(u.a)(t,["output","connections"]));return Object(f.jsx)("div",Object(c.a)(Object(c.a)({id:e.id},n),{},{className:"circuit-output ".concat(1===e.value?"circuit-output-on":""),style:{right:e.position.x,top:e.position.y}}))},m=function(t){var e=t.gate,n=(t.connections,t.onConnectionMade);return Object(f.jsxs)("div",{id:e.id,className:"circuit-gate circuit-gate-".concat(e.type),style:{left:e.position.x,top:e.position.y},onMouseDown:function(t){S||(S={gateId:e.id,startMousePos:{x:t.clientX,y:t.clientY},startGatePos:{x:e.position.x,y:e.position.y}})},children:[Object(f.jsx)("div",{className:"circuit-gate-inputs",children:Object.values(e.inputById).map((function(t){return Object(f.jsx)("div",{id:t.id,className:"circuit-gate-input ".concat(1===t.value?"circuit-gate-input-on":""),onMouseUp:function(){M&&n(M,t.id),M=null}},t.id)}))}),Object(f.jsx)("div",{className:"circuit-gate-name",children:e.name}),Object(f.jsx)("div",{className:"circuit-gate-outputs",children:Object.values(e.outputById).map((function(t){return Object(f.jsx)("div",{id:t.id,className:"circuit-gate-output ".concat(1===t.value?"circuit-gate-output-on":""),onMouseDown:function(e){M||(M=t.id,e.stopPropagation())}},t.id)}))})]})},B=function(t){var e,n,i,a,s=t.start,o=t.end,c=t.complete,u=void 0!==c&&c,l=document.getElementById(s),r=document.getElementById(o);if(u){if(!l||!r)return null;var d=l.getBoundingClientRect(),p=r.getBoundingClientRect();e=d.x+d.width/2,n=d.y+d.height/2,i=p.x+p.width/2,a=p.y+p.height/2}else{if(!l)return null;var h=l.getBoundingClientRect();e=h.x+h.width/2,n=h.y+h.height/2,i=P.x,a=P.y}return Object(f.jsx)("line",{x1:e,y1:n,x2:i,y2:a})},N=g("BASE",0,0,[],[]),k=new N,w=g("AND",2,1,[],[],(function(t){var e=t.inputById[t.inputs[0]],n=t.inputById[t.inputs[1]],i=t.outputById[t.outputs[0]];1===e.value&&1===n.value?i.state=1:i.state=0})),C=g("NOT",1,1,[],[],(function(t){var e=t.inputById[t.inputs[0]],n=t.outputById[t.outputs[0]];1===e.value?n.state=0:n.state=1})),M=null,S=null,P={x:0,y:0},D=[{classPointer:w,name:"AND"},{classPointer:C,name:"NOT"}];window.circuit=k;var G=function(){var t=a.a.useState(),e=Object(d.a)(t,2)[1],n=a.a.useCallback((function(){return e({})}),[]),i=function(t,e){k.addConnection(t,e),n()};return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsxs)("div",{className:"circuit",onMouseUp:function(){M=null,S=null,n()},onMouseMove:function(t){if(M&&(P.x=t.clientX,P.y=t.clientY,n()),S){var e=t.clientX-S.startMousePos.x,i=t.clientY-S.startMousePos.y,a=S.startGatePos.x+e,s=S.startGatePos.y+i;k.gates[S.gateId].position.x=a,k.gates[S.gateId].position.y=s,n()}},children:[Object(f.jsx)("div",{className:"circuit-inputs",onClick:function(t){k.addInput(t.clientY-20),n()}}),Object(f.jsx)("div",{className:"circuit-outputs",onClick:function(t){k.addOutput(t.clientY-20),n()}}),Object.values(k.inputById).map((function(t){return Object(f.jsx)(x,{input:t,connections:k.connections,onClick:function(e){e.ctrlKey?k.removeInput(t.id):(t.toggle(),k.allDestinations(t.id).forEach((function(t){return k.updateNode(t)}))),n()},onMouseDown:function(){M||(M=t.id)}},t.id)})),Object.values(k.outputById).map((function(t){return Object(f.jsx)(I,{output:t,connections:k.connections,onClick:function(e){e.ctrlKey&&k.removeOutput(t.id),n()},onMouseUp:function(){M&&i(M,t.id),M=null}},t.id)})),Object.values(k.gates).map((function(t){return Object(f.jsx)(m,{gate:t,connections:k.connections,onConnectionMade:i},t.id)})),Object(f.jsxs)("svg",{children:[Array.from(k.connections).map((function(t){var e=t.split("-"),n=Object(d.a)(e,2),i=n[0],a=n[1];return Object(f.jsx)(B,{complete:!0,start:i,end:a},t)})),M&&Object(f.jsx)(f.Fragment,{children:Object(f.jsx)(B,{start:M})})]})]}),Object(f.jsxs)("div",{className:"tools",children:[Object(f.jsxs)("div",{className:"tools-save",children:[Object(f.jsx)("input",{id:"gate-name",className:"tools-save-name",placeholder:"New gate name"}),Object(f.jsx)("button",{className:"tools-save-submit",onClick:function(t){var e=document.getElementById("gate-name");if(e.value.length){var i=k.transformToGate(e.value);D.push({name:e.value,classPointer:i}),e.value="",k=new N,n()}},children:"Create"})]}),Object(f.jsx)("div",{className:"tools-gates",children:D.map((function(t){return Object(f.jsx)("div",{children:Object(f.jsx)("button",{className:"tools-gate",onClick:function(){k.addGate(t.classPointer,50,20),n()},children:t.name},t.name)})}))})]})]})};o.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(G,{})}),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.300a993f.chunk.js.map