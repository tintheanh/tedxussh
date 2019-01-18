// import React from 'react';

// class Agenda extends React.Component {
//   renderAgendaHeaders(agdHeaders) {
//     const arr = [];
//     Object.keys(agdHeaders).forEach(e => {
//       const agdHeader = {
//         id: e,
//         content: agdHeaders[e].content
//       };
//       arr.push(agdHeader);
//     });

//     return arr.map(e => <p key={e.id}>{e.content}</p>);
//   }

//   renderAgenda(agenda) {
//     return agenda.map(e => (
//       <div className="col-12" key={e.id}>
//         <strong>{e.time}</strong>
//         <div>{this.renderAgendaHeaders(e.headers)}</div>
//         <p>{e.detail}</p>
//         <p>{e.participants}</p>
//       </div>
//     ));
//   }
//   render() {
//     const { agd } = this.props;
//     return (
//       <div className="col-12">
//         <strong>{agd.time}</strong>
//         <div>{this.renderAgendaHeaders(agd.headers)}</div>
//         <p>{agd.detail}</p>
//         <p>{agd.participants}</p>
//         <button>Edit</button>
//         <button>Delete</button>
//       </div>
//     );
//   }
// }

// export default Agenda;
