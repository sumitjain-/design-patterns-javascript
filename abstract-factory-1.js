setHeading('Abstract Factory Pattern - 1');

/**
 * Creates a base object to initialise a new user
 * @param {'USER'|'AGENT'|'ADMIN'} profileType Type of profile to be created
 */
function getUserInit(profileType) {
  return {
    _id: `${profileType}_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    _type: profileType,
  };
}

function ProfileFactory() {
  const profileStore = {};

  // allows us to decide type of profile on run-time
  this.getBuilder = (profileType) => {
    switch (profileType) {
      case 'ADMIN':
        return (params = {}) => {
          const result = {
            ...getUserInit(profileType),
            isAdmin: true,
            hasChildren: false,
          };
          profileStore[result._id] = result;
          return result;
        }
      case 'AGENT':      
        return (params = {}) => {
          const result = {
            ...getUserInit(profileType),
            isAdmin: false,
            hasClients: true,
            clients: [...(params.clients || [])],
          };
          profileStore[result._id] = result;
          return result;
        }
      case 'USER':      
        return (params = {}) => {
          const result = {
            ...getUserInit(profileType),
            isAdmin: false,
            hasChildren: false,
          };
          profileStore[result._id] = result;
          return result;
        }
      default:
        return (params = {}) => {
          const result = {
            ...getUserInit(profileType),
            params,
          };
          profileStore[result._id] = result;
          return result;
        }
    }
  };

  this.getAllProfiles = () => ({
    size: Object.keys(profileStore).length,
    items: profileStore,
  });
  
  this.query = (q) => Object.values(profileStore).filter(q);
}

const myProfileFactory = new ProfileFactory();

const userCreator = myProfileFactory.getBuilder('USER');

const user1 = userCreator();
const user2 = userCreator();
const agent1 = myProfileFactory.getBuilder('AGENT')({ clients: [user1, user2] });
const admin1 = myProfileFactory.getBuilder('ADMIN')();

console.log(user1);
console.log(user2);
console.log(agent1);
console.log(admin1);

console.log(myProfileFactory.getAllProfiles());

console.log(myProfileFactory.query((p) => (p.isAdmin)));
