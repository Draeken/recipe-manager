# Architecture

## Recipe Creation

Output:

- recipe data

```javascript
//class object
{
  parents: [classRef], // sweet products ; fruit products - similar to tags in usage
  children: [classRef],
  en: {
    names: ['class name'],
    desc: 'meaningful description'
  },
  fr: {
    names: ['nom de classe'],
    desc: 'description pertinente'
  }
}

//query object
{
  lang: 'en',
  query: 'overripe'
}

//operation object
// Should represent the same concept internotially. If the same verb is performed in a different way, it justifies a new operation (may be a kind of fork).
{
  inputs: [
    {
      name: {
        en: 'first operand'
      }
      class: classRef
    },
    {
      name: {
        en:'operand',
      }
      class?: classRef,
      quantity: {
        unit: 1
      }
    }
  ],
  outputs: [{
    name: {
      en: "$0 with $1",
    }
  }],
  args: [{
    type: temperature | time | number | enum
    name: {
      en: 'temperature'
    }
  }],
  timeCost: 15, (s)
  verbs: {
    en: ["put"]
  },
  description: {
    en: "put $0 to $1 at $$0", // $ -> input, $$ -> arg
  }
}

// Procedure
{
  ...operation,
  steps: []
}

// Condition
{
  names: {
    en: ["cooked"]
  },
  description: {
    en: "wait it to cook $$0", //$$ -> arg
  },
  args: [{
    type: temperature | time | number | enum
    name: {
      en: 'temperature'
    }
  }]
}

//recipe object
//all units should be homogeneous. users may display a different unit. conversion is managed by the frontend
{
  names: 'recipe name', /* unique name -> variant are stored in class definition */
  class: classRef,
  lang: 'fr',
  quantity: {
    unit: 1,
    mass: 250, (g)
    volume: 1000 (ml)
  },
  otherOutputs: [{
    names: ['byproduct name']
    class: classRef,
    quantity: {
      volume: 1000
    }
  }],
  inputs: [{
    class: classRef,
    query: queryRef,
    ref: 'localRef',
    quantity: {
      volume: 250
    },
    size: {
      volume: 1000, (ml)
      area: 23, (cm²)
      fidelity: 'at least' | 'strictly' | 'nearly'
    }
  }],
  steps: [{
    precondition: { //what if the condition varies greatly depending of which procedure is chose? - dependsOn -> after a step is done -> use operation's time cost
      ref: conditionRef,
      dependsOn: [stepIndex]
      time: 3600, (s) //aproximation, maybe should be included in condition obj and determined with args
      args: []
    },
    inputs: [{
      ref: 'localRef',
      quantity: {
        relative: 0.5,
      }
    }],
    operation: {
      ref: operationRef, // could use operationClass instead of specific operation
      args: [],
    },
    outputAlias: ['product alias', 'byproduct alias'] //optional
  },
  {
    repeat: {
      stopCondition?: conditionRef,
      args: [],
      loops: 3
    },
    steps: []
  }]
}
```
