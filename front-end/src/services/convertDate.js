const convertDate = (data) => {
  const date = new Date(data);
  const dia = date.getDate().toString();
  const zero = '0';
  let diaF = '';
  let mes = '';
  let mesF = '';
  let anoF = '';
  diaF = (dia.length === 1) ? zero + dia : dia;
  mes = (date.getMonth() + 1).toString();
  mesF = (mes.length === 1) ? zero + mes : mes;
  anoF = date.getFullYear();
  return `${diaF}/${mesF}/${anoF}`;
};

export default convertDate;
