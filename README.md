# dof-reader

This node library parses NYC quarterly statement tax bill pdfs.

While tax bills contain lots of useful and interesting information about a property, this project is very narrow in scope. It only extracts if the tax bills has a rent-stabilization fee and how many registered rent-stabilized units there are.

Install: ` npm install dof-reader `

Use: ` ./dof-reader.js /path/to/tax_bill.pdf `

example output: 

``` json
{
	"rentStabilzed": true,
	"unitCount": 25,
	"date": "2018-02-28"
}
```


run the tests: `npm test `
