import { base_url } from 'utils/config';

export const NOT_FOUND_IMAGE = 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png';
export const isArrayCheck = (arr) => {
    return Array.isArray(arr) && arr.length > 0;
};
export const checkEmptyArray = (arr) => {
    return Array.isArray(arr);
};

export const getRandomData = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len) throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};

export const getTypeEnvText = (value) => {
    if (value === "indoor") {
        return "Indoor Use Only";
    } else if (value === "outdoor") {
        return "Outdoor Use Only";
    } else if (value === "both") {
        return "Indoor & Outdoor Use Only"
    }

    return "-";
}

export const getDimension = (product) => {
    return `${product?.length}cm Length, ${product?.breadth}cm Breadth, ${product?.height}cm Height`;
}

export const DayInNumber = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31'
];
export const MonthInNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
export const YearInNumber = [
    '1981',
    '1982',
    '1983',
    '1984',
    '1985',
    '1986',
    '1987',
    '1988',
    '1989',
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022'
];


export function image_url(url) {
    if (url && url.includes("http")) {
      return url;
    } else {
      return base_url + url;
    }
  }

  export const dumyOptions = [
    {
      _id:1,  
      name:'dhl',
    },
    {
        _id:2,
      name:'FedEx',
    },
    {
        _id:3,
      name:'DB Schenker',
    },
    {
        _id:4,
      name:'YRC Freight',
    },
  ]  