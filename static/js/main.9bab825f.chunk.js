(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{15:function(t,e,i){},16:function(t,e,i){},18:function(t,e,i){"use strict";i.r(e);var s=i(1),n=i.n(s),a=i(9),r=i.n(a),o=(i(15),i(16),i(2)),l=n.a.createContext(null);function c(t,e){return!!t.find((function(t){return JSON.stringify(t)===JSON.stringify(e)}))}function h(t,e){var i=null;return t.find((function(t,s){return JSON.stringify(t)===JSON.stringify(e)?i=s:null})),i}var u=i(0);function d(t){var e=Object(s.useContext)(l).grid;return Object(u.jsx)("div",{className:"board",children:e.map((function(e,i){return Object(u.jsx)("div",{id:i,className:"board-square",onClick:function(e){return t.isComputer?t.handleClick(e):null}},i)}))})}function p(t){for(var e=Object(s.useContext)(l).grid,i=Object(s.useContext)(l),n=i.shipsOrientation,a=i.setShipsOrientation,r=Object(s.useContext)(l),o=r.humanPlayer,c=r.setHumanPlayer,h=Object(s.useContext)(l).setAllShipsPlaced,d=[],p=0;p<t.shipLength;p++)d.push(p);return Object(u.jsx)("div",{className:"ship-".concat(t.index+1," ship"),"data-name":t.name,draggable:"true",onDragEnd:function(t){return function(t){var i=document.elementFromPoint(t.clientX,t.clientY);if("board-square"===i.getAttribute("class")){var s=e[parseInt(i.id)],a=t.target.getAttribute("data-name"),r=n[a].shipLength,l=Object.assign(Object.create(Object.getPrototypeOf(o)),o);if(l.board.isValidPosition(r,s,n[a].isHorizontal)){l.board.placeShip(r,s,n[a].isHorizontal);for(var u=0;u<r;u++)n[a].isHorizontal?document.getElementById("".concat(parseInt(i.id)+u)).classList.add("ship-position"):document.getElementById("".concat(parseInt(i.id)+10*u)).classList.add("ship-position");t.target.style.display="none";var d=document.querySelector(".ships");5===l.board.aliveShips.length&&(h(!0),d.style.display="none"),c(l)}}}(t)},onClick:function(t){return function(t){var e=t.target.parentElement.getAttribute("data-name"),i=n[e].shipLength;if(!n[e].isPlaced)if(n[e].isHorizontal){t.target.parentElement.style.height="".concat(5*i,"rem"),t.target.parentElement.style.width="5rem",t.target.parentElement.style.flexDirection="column";var s=JSON.parse(JSON.stringify(n));s[e].isHorizontal=!1,a(s)}else{t.target.parentElement.style.width="".concat(5*i,"rem"),t.target.parentElement.style.height="5rem",t.target.parentElement.style.flexDirection="row";var r=JSON.parse(JSON.stringify(n));r[e].isHorizontal=!0,a(r)}}(t)},children:d.map((function(t,e){return Object(u.jsx)("div",{},e)}))})}var b=i(4),j=i(5),f=i(10),m=i(8),O=function(){function t(e,i,s){Object(b.a)(this,t),this.shipLength=e,this.position=i,this.isHorizontal=s,this.hits=0,this.hit=this.hit.bind(this),this.isSunk=this.isSunk.bind(this)}return Object(j.a)(t,[{key:"hit",value:function(t){return(this.isHorizontal&&t[0]>=this.position[0]&&t[0]<=this.position[0]+this.shipLength-1&&t[1]===this.position[1]||!this.isHorizontal&&t[1]>=this.position[1]&&t[1]<=this.position[1]+this.shipLength-1&&t[0]===this.position[0])&&(this.hits+=1,!0)}},{key:"isSunk",value:function(){return this.hits===this.shipLength}}]),t}(),g=function(){function t(e){Object(b.a)(this,t),this.boardSize=e,this.filledShipPositions=[],this.availableShipPositions=[],this.availableAttackPositions=[],this.aliveShips=[],this.setAvailableShipPositions=this.setAvailableShipPositions.bind(this),this.getAdjacentPositionsHorizontal=this.getAdjacentPositionsHorizontal.bind(this),this.getAdjacentPositionsVertical=this.getAdjacentPositionsVertical.bind(this),this.getRandomPosition=this.getRandomPosition.bind(this),this.placeShip=this.placeShip.bind(this),this.receiveAttack=this.receiveAttack.bind(this),this.allShipsSank=this.allShipsSank.bind(this),this.isValidPosition=this.isValidPosition.bind(this);for(var i=0;i<this.boardSize;i++)for(var s=0;s<this.boardSize;s++)this.availableAttackPositions.push([s,i]),this.availableShipPositions.push([s,i])}return Object(j.a)(t,[{key:"setAvailableShipPositions",value:function(){var t,e=JSON.parse(JSON.stringify(this.availableShipPositions)),i=Object(m.a)(e);try{for(i.s();!(t=i.n()).done;){var s=t.value;c(this.filledShipPositions,s)&&this.availableShipPositions.splice(h(this.availableShipPositions,s),1)}}catch(n){i.e(n)}finally{i.f()}}},{key:"getAdjacentPositionsHorizontal",value:function(t,e){for(var i=[],s=0;s<t;s++)0===s?(i.push([e[0]-1,e[1]]),i.push([e[0],e[1]+1]),i.push([e[0],e[1]-1]),i.push([e[0]-1,e[1]+1]),i.push([e[0]-1,e[1]-1])):s===t-1?(i.push([e[0]+t,e[1]]),i.push([e[0]+t-1,e[1]+1]),i.push([e[0]+t-1,e[1]-1]),i.push([e[0]+t,e[1]+1]),i.push([e[0]+t,e[1]-1])):(i.push([e[0]+s,e[1]+1]),i.push([e[0]+s,e[1]-1]));return i}},{key:"getAdjacentPositionsVertical",value:function(t,e){for(var i=[],s=0;s<t;s++)0===s?(i.push([e[0]-1,e[1]]),i.push([e[0]+1,e[1]]),i.push([e[0],e[1]-1]),i.push([e[0]-1,e[1]-1]),i.push([e[0]+1,e[1]-1])):s===t-1?(i.push([e[0]-1,e[1]+t-1]),i.push([e[0]+1,e[1]+t-1]),i.push([e[0],e[1]+t]),i.push([e[0]+1,e[1]+t]),i.push([e[0]-1,e[1]+t])):(i.push([e[0]-1,e[1]+s]),i.push([e[0]+1,e[1]+s]));return i}},{key:"isValidPosition",value:function(t,e,i){var s=this;if(this.setAvailableShipPositions(),e[0]>=0&&e[0]<this.boardSize&&e[1]>=0&&e[1]<this.boardSize&&c(this.availableShipPositions,e))if(i&&e[0]+t-1<this.boardSize){if(!!!this.getAdjacentPositionsHorizontal(t,e).find((function(t){return s.filledShipPositions.find((function(e){return JSON.stringify(e)===JSON.stringify(t)}))})))return!0}else if(!i&&e[1]+t-1<this.boardSize){if(!!!this.getAdjacentPositionsVertical(t,e).find((function(t){return s.filledShipPositions.find((function(e){return JSON.stringify(e)===JSON.stringify(t)}))})))return!0}return!1}},{key:"getRandomPosition",value:function(t,e,i,s){if(t){for(var n=null;n=this.availableShipPositions[Math.floor(Math.random()*this.availableShipPositions.length)],!this.isValidPosition(i,n,s););return n}if(e)return this.availableAttackPositions[Math.floor(Math.random()*this.availableAttackPositions.length)]}},{key:"placeShip",value:function(t,e,i){var s=new O(t,e,i);this.aliveShips.push(s);for(var n=0;n<t;n++)i?this.filledShipPositions.push([e[0]+n,e[1]]):this.filledShipPositions.push([e[0],e[1]+n])}},{key:"placeShipsRandomly",value:function(t){var e=this;Object.keys(t).forEach((function(i){var s=Math.random()>.5,n=t[i].shipLength,a=e.getRandomPosition(!0,!1,n,s);e.placeShip(n,a,s)}))}},{key:"receiveAttack",value:function(t){var e,i=Object(f.a)(this.aliveShips),s=Object(m.a)(i);try{for(s.s();!(e=s.n()).done;){var n=e.value;n.hit(t)&&n.isSunk()&&(n.currShipLength=n.length,this.aliveShips.splice(h(this.aliveShips,n),1))}}catch(a){s.e(a)}finally{s.f()}this.availableAttackPositions.splice(h(this.availableAttackPositions,t),1)}},{key:"allShipsSank",value:function(){return 0===this.aliveShips.length}}]),t}(),v=function(){function t(){Object(b.a)(this,t),this.board=new g(10)}return Object(j.a)(t,[{key:"attackEnemy",value:function(t,e){t.board.receiveAttack(e)}}]),t}(),y=i.p+"static/media/logo.dc5cde12.png";function S(){var t=Object(s.useState)([]),e=Object(o.a)(t,2),i=e[0],n=e[1],a=Object(s.useState)(null),r=Object(o.a)(a,2),b=r[0],j=r[1],f=Object(s.useState)(null),m=Object(o.a)(f,2),O=m[0],g=m[1],S=Object(s.useState)(!1),P=Object(o.a)(S,2),x=P[0],k=P[1],N=Object(s.useState)(null),A=Object(o.a)(N,2),E=A[0],z=A[1],C=Object(s.useState)(null),L=Object(o.a)(C,2),H=L[0],w=L[1],J=Object(s.useState)(!1),q=Object(o.a)(J,2),R=q[0],I=q[1],B=Object(s.useState)({carrier:{shipLength:5,isHorizontal:!0},battleship:{shipLength:4,isHorizontal:!0},cruiser:{shipLength:3,isHorizontal:!0},submarine:{shipLength:3,isHorizontal:!0},destroyer:{shipLength:2,isHorizontal:!0}}),G=Object(o.a)(B,2),V=G[0],T=G[1],M={grid:i,humanPlayer:b,setHumanPlayer:j,allShipsPlaced:x,setAllShipsPlaced:k,winner:E,setWinner:z,humanPlayerTurn:H,setHumanPlayerTurn:w,startGameBtnClicked:R,setStartGameBtnClicked:I,shipsOrientation:V,setShipsOrientation:T};Object(s.useEffect)((function(){j(new v),g(new v);for(var t=[],e=0;e<10;e++)for(var i=0;i<10;i++)t.push([i,e]);n(t)}),[]);return Object(u.jsxs)("div",{className:"game-container",children:[Object(u.jsxs)("div",{className:"game-heading",children:[Object(u.jsx)("img",{src:y,alt:"Battleship game logo"}),Object(u.jsx)("h1",{children:"Battleship"})]}),Object(u.jsxs)("div",{className:"game-instructions",children:[Object(u.jsx)("h2",{children:"Instructions"}),Object(u.jsxs)("ul",{children:[Object(u.jsx)("li",{children:"Click on the ship to rotate it."}),Object(u.jsx)("li",{children:"Drag the head of the block and drop it on the board to place it."}),Object(u.jsx)("li",{children:"Once all your ships are placed, click on the button to start the game."})]})]}),Object(u.jsxs)("div",{className:"game-rules",children:[Object(u.jsx)("h2",{children:"Rules"}),Object(u.jsxs)("ul",{children:[Object(u.jsx)("li",{children:"You cannot place the ships adjacent to each other."}),Object(u.jsx)("li",{children:"The player who destroys all the enemy's ships wins."})]})]}),Object(u.jsx)("button",{className:"start-game-btn",onClick:function(t){return function(t){if("Restart Game"===t.target.textContent){j(new v),g(new v),I(!1),k(!1),z(null),t.target.textContent="Start Game";var e=document.querySelector(".ships");e.style.display="block",e.childNodes.forEach((function(t){return t.style.display="flex"})),document.querySelectorAll(".player-board .board .board-square").forEach((function(t){t.className="board-square",t.childNodes.length>0&&t.removeChild(t.childNodes[0])}))}else{var i=Object.assign(Object.create(Object.getPrototypeOf(O)),O);i.board.placeShipsRandomly(V),g(i),I(!0),w(!0),k(!1)}}(t)},style:{display:x?"block":"none"},children:"Start Game"}),x||R||!b||0!==b.board.aliveShips.length?null:Object(u.jsx)("button",{className:"place-random-btn",onClick:function(t){return function(t){var e=Object.assign(Object.create(Object.getPrototypeOf(b)),b);e.board.placeShipsRandomly(V),e.board.filledShipPositions.forEach((function(t){var e=h(i,t);document.querySelectorAll(".player-board .board .board-square")[e].classList.add("ship-position")})),document.querySelector(".ships").style.display="none",j(e),k(!0)}()},children:"Place Randomly"}),"human"===E?Object(u.jsx)("p",{className:"winner-text",children:"Game Over! You Win"}):"computer"===E?Object(u.jsx)("p",{className:"winner-text",children:"Game Over! Computer Win"}):null,Object(u.jsx)(l.Provider,{value:M,children:Object(u.jsxs)("div",{className:"board-container",children:[Object(u.jsxs)("div",{className:"player-board",children:[Object(u.jsx)("h3",{children:"Your Battlefield"}),Object(u.jsx)(d,{isComputer:!1})]}),Object(u.jsx)("div",{className:"ships",children:Object.keys(V).map((function(t,e){return Object(u.jsx)(p,{index:e,shipLength:V[t].shipLength,name:t,humanPlayer:b},e)}))}),!0===H?Object(u.jsx)("p",{className:"player-turn",children:"Your Turn"}):!1===H?Object(u.jsx)("p",{className:"player-turn",children:"Computer's Turn"}):null,R?Object(u.jsxs)("div",{className:"computer-board",children:[Object(u.jsx)("h3",{children:"Computer's Battlefield"}),Object(u.jsx)(d,{isComputer:!0,handleClick:function(t){var e=Object.assign(Object.create(Object.getPrototypeOf(b)),b),s=Object.assign(Object.create(Object.getPrototypeOf(O)),O);e.attackEnemy(s,i[t.target.id]);var n=document.createElement("div");if(console.log("Player Attacked"),c(s.board.filledShipPositions,i[t.target.id])?n.classList.add("successful-attack"):n.classList.add("unsuccessful-attack"),t.target.appendChild(n),t.target.style.pointerEvents="none",t.target.parentElement.style.zIndex="-10",t.target.parentElement.style.opacity="0.2",s.board.allShipsSank())return z("human"),w(null),t.target.parentElement.style.zIndex="-10",t.target.parentElement.style.opacity="0.2",k(!0),void(document.querySelector(".start-game-btn").textContent="Restart Game");w(!1),setTimeout((function(){var n=e.board.getRandomPosition(!1,!0);s.attackEnemy(e,n),console.log("Computer Attacked");var a=h(i,n),r=document.querySelectorAll(".player-board .board .board-square")[a],o=document.createElement("div");if(c(e.board.filledShipPositions,n)?o.classList.add("successful-attack"):o.classList.add("unsuccessful-attack"),r.appendChild(o),t.target.parentElement.style.zIndex="10",t.target.parentElement.style.opacity="1",e.board.allShipsSank())return z("computer"),w(null),t.target.parentElement.style.zIndex="-10",t.target.parentElement.style.opacity="0.2",k(!0),void(document.querySelector(".start-game-btn").textContent="Restart Game");w(!0),j(e),g(s)}),1500)}})]}):null]})})]})}var P=function(){return Object(u.jsx)("div",{className:"App",children:Object(u.jsx)(S,{})})};r.a.render(Object(u.jsx)(P,{}),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.9bab825f.chunk.js.map