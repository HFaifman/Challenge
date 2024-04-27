class Validator {
  checkParamPresenceAndValidType = ({ param, type, errorMessageType }) => {
    if (!param) {
      throw Error(`${errorMessageType} is needed`);
    } else if (typeof param !== type) {
      throw Error(`${errorMessageType} is not of type ${type}`);
    }
  };
}

class Animal {
  constructor(type, sound) {
    const validator = new Validator();
    validator.checkParamPresenceAndValidType({
      param: type,
      type: "string",
      errorMessageType: "type",
    });
    validator.checkParamPresenceAndValidType({
      param: sound,
      type: "string",
      errorMessageType: "sound",
    });
    this.type = type;
    this.sound = sound;
  }

  speak(speech) {
    const validator = new Validator();
    validator.checkParamPresenceAndValidType({
      param: speech,
      type: "string",
      errorMessageType: "speech",
    });
    const splitSpeech = speech.split(" ");
    return splitSpeech.map((phrase) => `${phrase} ${this.sound} `).join("");
  }
}

class Lion extends Animal {
  constructor() {
    super("lion", "roar");
  }
}

class Tiger extends Animal {
  constructor() {
    super("tiger", "grrr");
  }
}

class Zoo {
  constructor() {
    this.animals = [new Lion(), new Tiger()];
  }

  addNewAnimal(animal) {
    if (animal instanceof Animal) {
      this.animals = [...this.animals, animal];
      return this.animals;
    }
    throw Error("not a valid animal");
  }

  getAnimals() {
    return this.animals;
  }
}

export default Zoo;
