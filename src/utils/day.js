import moment from 'moment';

const day = (value) => {
  // eslint-disable-next-line newline-per-chained-call
  const tgl = new Date(value).toISOString().slice(0, 10).split('-').join('');
  moment.locale('id');
  return moment(tgl).format('LL');
};

export default day;
