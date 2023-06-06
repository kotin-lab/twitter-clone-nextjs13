'use client';

import Moment from "react-moment";

export default function Date({date}) {
  return <Moment fromNow>{date}</Moment>;
}
