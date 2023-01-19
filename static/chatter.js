function generateRandomNickname(){
    let result = "";

    let adjectives = ["Dopey", "Doc", "Sneezy", "Bashful", "Sleepy", "Grumpy", "Happy"];
    let subjectives = ["Car", "Dog", "House", "Moon", "Water", "Table", "Trouble"];

    let randomAdjective = adjectives[Math.floor(Math.random()*adjectives.length)];
    let randomSubjective = subjectives[Math.floor(Math.random()*subjectives.length)];

    result += randomAdjective;
    result += randomSubjective;
    result += Math.floor(Math.random() * 90 + 10);    
    return result;
}

nicknameInputField.value = generateRandomNickname();