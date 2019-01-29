export const modifyObj = (isVN, obj, type) => {
  const modify = { ...obj };
  let left = {};
  let middle = {};
  let right = {};
  switch (type) {
    case 'home':
      if (
        modify.title &&
        modify.title.includes('||') &&
        modify.description &&
        modify.description.includes('||') &&
        modify.left &&
        modify.left.title.includes('||') &&
        modify.left.description.includes('||') &&
        modify.middle &&
        modify.middle.title.includes('||') &&
        modify.middle.description.includes('||') &&
        modify.right &&
        modify.right.title.includes('||') &&
        modify.right.description.includes('||')
      ) {
        const title = modify.title.split('||');
        const description = modify.description.split('||');
        left = { ...modify.left };
        middle = { ...modify.middle };
        right = { ...modify.right };

        const leftTitle = left.title.split('||');
        const leftDesc = left.description.split('||');

        const midTitle = middle.title.split('||');
        const midDesc = middle.description.split('||');

        const rightTitle = right.title.split('||');
        const rightDesc = right.description.split('||');
        if (isVN) {
          [modify.title] = [title[0]];
          [modify.description] = [description[0]];

          [left.title] = [leftTitle[0]];
          [left.description] = [leftDesc[0]];

          [middle.title] = [midTitle[0]];
          [middle.description] = [midDesc[0]];

          [right.title] = [rightTitle[0]];
          [right.description] = [rightDesc[0]];
        } else {
          [modify.title] = [title[1]];
          [modify.description] = [description[1]];

          [left.title] = [leftTitle[1]];
          [left.description] = [leftDesc[1]];

          [middle.title] = [midTitle[1]];
          [middle.description] = [midDesc[1]];

          [right.title] = [rightTitle[1]];
          [right.description] = [rightDesc[1]];
        }
        return { ...modify, left, middle, right };
      }
      return obj;
    case 'footer':
      if (
        modify.copyright &&
        modify.copyright.includes('||') &&
        modify.middle &&
        modify.middle.sentence.includes('||') &&
        modify.right &&
        modify.right.sentence.includes('||')
      ) {
        const copyright = modify.copyright.split('||');
        middle = { ...modify.middle };
        right = { ...modify.right };

        const midSen = middle.sentence.split('||');
        const rightSen = right.sentence.split('||');
        if (isVN) {
          [modify.copyright] = [copyright[0]];

          [middle.sentence] = [midSen[0]];
          [right.sentence] = [rightSen[0]];
        } else {
          [modify.copyright] = [copyright[1]];

          [middle.sentence] = [midSen[1]];
          [right.sentence] = [rightSen[1]];
        }
        return { ...modify, middle, right };
      }
      return obj;

    case 'overview':
      if (modify.description && modify.address) {
        const description = modify.description.split('||');
        const address = modify.address.split('||');
        if (isVN) {
          [modify.description] = [description[0]];
          [modify.address] = [address[0]];
        } else {
          [modify.description] = [description[1]];
          [modify.address] = [address[1]];
        }
        return { ...modify };
      }
      return obj;
    case 'speakers':
    case 'hosts':
    case 'performers':
      if (modify.description) {
        const description = modify.description.split('||');
        if (isVN) {
          [modify.description] = [description[0]];
        } else {
          [modify.description] = [description[1]];
        }
        return { ...modify };
      }
      return obj;
    case 'agenda':
      if (modify.agendaList) {
        const agendaList = [...modify.agendaList];
        agendaList.forEach(e => {
          if (e && e.header.includes('||')) {
            if (e.detail.includes('||')) {
              const header = e.header.split('||');
              const detail = e.detail.split('||');
              if (isVN) {
                [e.header] = [header[0]];
                [e.detail] = [detail[0]];
              } else {
                [e.header] = [header[1]];
                [e.detail] = [detail[1]];
              }
            } else {
              const header = e.header.split('||');
              if (isVN) {
                [e.header] = [header[0]];
              } else {
                [e.header] = [header[1]];
              }
            }
          }
        });
        return { ...modify, agendaList };
      }
      return obj;
    case 'adventures':
      if (modify.description && modify.header) {
        const description = modify.description.split('||');
        const header = modify.header.split('||');
        if (isVN) {
          [modify.description] = [description[0]];
          [modify.header] = [header[0]];
        } else {
          [modify.description] = [description[1]];
          [modify.header] = [header[1]];
        }
        return { ...modify };
      }
      return obj;
    case 'sponsors':
      if (modify.description) {
        const description = modify.description.split('||');
        if (isVN) {
          [modify.description] = [description[0]];
        } else {
          [modify.description] = [description[1]];
        }
        return { ...modify };
      }
      return obj;
    case 'location':
      if (modify.address) {
        const address = modify.address.split('||');
        if (isVN) {
          [modify.address] = [address[0]];
        } else {
          [modify.address] = [address[1]];
        }
        return { ...modify };
      }
      return obj;
    case 'learn':
      if (modify.title) {
        const title = modify.title.split('||');
        if (isVN) {
          [modify.title] = [title[0]];
        } else {
          [modify.title] = [title[1]];
        }
        return { ...modify };
      }
      return obj;
    case 'post':
    case 'video':
      if (modify.header) {
        const header = modify.header.split('||');
        if (isVN) {
          [modify.header] = [header[0]];
        } else {
          [modify.header] = [header[1]];
        }
        return { ...modify };
      }
      return obj;
    case 'about':
      if (
        modify.header &&
        modify.header.includes('||') &&
        modify.left &&
        modify.left.title.includes('||') &&
        modify.left.description.includes('||') &&
        modify.middle &&
        modify.middle.title.includes('||') &&
        modify.middle.description.includes('||') &&
        modify.right &&
        modify.right.title.includes('||') &&
        modify.right.description.includes('||') &&
        modify.visions
      ) {
        const header = modify.header.split('||');
        left = { ...modify.left };
        middle = { ...modify.middle };
        right = { ...modify.right };

        const leftTitle = left.title.split('||');
        const leftDesc = left.description.split('||');

        const midTitle = middle.title.split('||');
        const midDesc = middle.description.split('||');

        const rightTitle = right.title.split('||');
        const rightDesc = right.description.split('||');

        if (isVN) {
          [modify.header] = [header[0]];

          [left.title] = [leftTitle[0]];
          [left.description] = [leftDesc[0]];

          [middle.title] = [midTitle[0]];
          [middle.description] = [midDesc[0]];

          [right.title] = [rightTitle[0]];
          [right.description] = [rightDesc[0]];
        } else {
          [modify.header] = [header[1]];

          [left.title] = [leftTitle[1]];
          [left.description] = [leftDesc[1]];

          [middle.title] = [midTitle[1]];
          [middle.description] = [midDesc[1]];

          [right.title] = [rightTitle[1]];
          [right.description] = [rightDesc[1]];
        }
        return { ...modify, left, middle, right };
      }
      return obj;
    default:
  }

  return null;
};

export const retrieveDataForConference = (obj, type) => {
  const data = { ...obj };
  switch (type) {
    case 'overview': {
      let overviewReturned = {};
      if (data.overview) {
        const { overview } = data;
        overviewReturned = {
          conferencePicture: overview.conferencePicture,
          date: overview.date,
          description: overview.description,
          endTime: overview.endTime,
          address: overview.location.address,
          startTime: overview.startTime,
          title: overview.title
        };
        return overviewReturned;
      }
      return overviewReturned;
    }
    case 'speakers': {
      let speakersReturned = {};
      if (data.speakers) {
        const { speakers } = data;
        const speakerList = [];
        if (speakers.speakerList) {
          Object.keys(speakers.speakerList).forEach(e => {
            const speaker = {
              id: e,
              introduction: speakers.speakerList[e].introduction,
              name: speakers.speakerList[e].name,
              occupation: speakers.speakerList[e].occupation,
              picture: speakers.speakerList[e].picture
            };
            speakerList.push(speaker);
          });
        }
        speakersReturned = {
          description: speakers.description,
          speakerList
        };
        return speakersReturned;
      }
      return speakersReturned;
    }
    case 'hosts': {
      let hostsReturned = {};
      if (data.hosts) {
        const { hosts } = data;
        const hostList = [];
        if (hosts.hostList) {
          Object.keys(hosts.hostList).forEach(e => {
            const host = {
              id: e,
              introduction: hosts.hostList[e].introduction,
              name: hosts.hostList[e].name,
              occupation: hosts.hostList[e].occupation,
              picture: hosts.hostList[e].picture
            };
            hostList.push(host);
          });
        }
        hostsReturned = {
          description: hosts.description,
          hostList
        };
        return hostsReturned;
      }
      return hostsReturned;
    }
    case 'performers': {
      let performersReturned = {};
      if (data.performers) {
        const { performers } = data;
        const performerList = [];
        if (performers.performerList) {
          Object.keys(performers.performerList).forEach(e => {
            const performer = {
              id: e,
              introduction: performers.performerList[e].introduction,
              name: performers.performerList[e].name,
              occupation: performers.performerList[e].occupation,
              picture: performers.performerList[e].picture
            };
            performerList.push(performer);
          });
        }
        performersReturned = {
          description: performers.description,
          performerList
        };
        return performersReturned;
      }
      return performersReturned;
    }
    case 'agenda': {
      let agendaReturn = {};
      if (data.overview) {
        const { agenda, overview } = data;
        const agendaList = [];
        if (agenda) {
          Object.keys(agenda).forEach(e => {
            const agd = {
              id: e,
              detail: agenda[e].detail,
              header: agenda[e].header,
              participants: agenda[e].participants,
              time: agenda[e].time
            };
            agendaList.push(agd);
          });
        }
        agendaReturn = {
          date: overview.date,
          agendaList
        };
        return agendaReturn;
      }
      return agendaReturn;
    }
    case 'theme': {
      let themeReturned = {};
      if (data.theme) {
        const { theme } = data;
        themeReturned = {
          detail: theme.detail,
          header: theme.header,
          picture: theme.picture
        };
        return themeReturned;
      }
      return themeReturned;
    }
    case 'adventures': {
      let adventuresReturn = {};
      if (data.adventures) {
        const { adventures } = data;
        const adventureList = [];
        if (adventures.adventureList) {
          Object.keys(adventures.adventureList).forEach(e => {
            const adventure = {
              id: e,
              detail: adventures.adventureList[e].detail,
              name: adventures.adventureList[e].name,
              picture: adventures.adventureList[e].picture
            };
            adventureList.push(adventure);
          });
        }
        adventuresReturn = {
          description: adventures.description,
          header: adventures.header,
          adventureList
        };
        return adventuresReturn;
      }
      return adventuresReturn;
    }
    case 'sponsors': {
      let sponsorsReturned = {};
      if (data.sponsors) {
        const { sponsors } = data;
        const sponsorList = [];
        if (sponsors.sponsorList) {
          Object.keys(sponsors.sponsorList).forEach(e => {
            const sponsor = {
              id: e,
              website: sponsors.sponsorList[e].website,
              logo: sponsors.sponsorList[e].logo
            };
            sponsorList.push(sponsor);
          });
        }
        sponsorsReturned = {
          description: sponsors.description,
          sponsorList
        };
        return sponsorsReturned;
      }
      return sponsorsReturned;
    }
    case 'location': {
      let locationReturned = {};
      if (data.overview) {
        const { overview } = data;
        locationReturned = {
          address: overview.location.address,
          lat: overview.location.lat,
          lng: overview.location.lng
        };
        return locationReturned;
      }
      return locationReturned;
    }
    case 'highlight': {
      const highLightReturned = [];
      if (data.highlight) {
        const { highlight } = data;
        Object.keys(highlight).forEach(e => {
          const picture = {
            id: e,
            name: highlight[e].name,
            url: highlight[e].url,
            height: highlight[e].height,
            width: highlight[e].width
          };
          highLightReturned.push(picture);
        });
        return highLightReturned;
      }
      return highLightReturned;
    }
    default:
  }
};
