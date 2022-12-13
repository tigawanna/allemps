

1
-- create channelmebers table
CREATE TABLE members (
    user_id uuid,
    channel_id uuid,
  PRIMARY KEY(user_id, channel_id)
);



create table public.profiles (
  id uuid references auth.users not null,
  name text,
  avatar text,
  bio text,
  country text,
  phone text,
  cv text
  primary key (id)
);

alter table public.profiles enable row level security;


create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- inserts a row into public.users
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();





fcd3b737-24bd-462b-a0a3-f30a34bd055a,f6519464-18c6-4c0f-9c0c-3f611e4f8504,3890c872-7175-4f73-9a02-5d8c74163e4b,8d6a24b3-a654-4ad0-be2d-69f656e7851c,1ddacdc6-3409-486b-89a2-14b405cd0597,91dc4175-2b47-4097-8fb6-3592243d303d

| created_at                    | name                  | color   | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | banner                                          | creator                              | id                                   |
| ----------------------------- | --------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------ | ------------------------------------ |
| 2022-12-12 18:29:52.573431+00 | Home                  | #822640 | Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.                                                                                                                                                                            | http://dummyimage.com/233x100.png/cc0000/ffffff | 3890c872-7175-4f73-9a02-5d8c74163e4b | 8cc300cc-3402-4747-bff4-d8b529820c15 |
| 2022-12-12 18:30:27.790341+00 | Automotive            | #83d3f8 | Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.                                                                              | http://dummyimage.com/123x100.png/dddddd/000000 | 8d6a24b3-a654-4ad0-be2d-69f656e7851c | 459a0f97-d664-42f1-8c81-31a1571e0857 |
| 2022-12-12 18:30:27.790341+00 | Shoes                 | #1a1085 | Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.                                                                                                                     | http://dummyimage.com/135x100.png/ff4444/ffffff | 3890c872-7175-4f73-9a02-5d8c74163e4b | ebc7e3fd-d232-4148-9a57-a9a290b54935 |
| 2022-12-12 18:30:27.790341+00 | Toys                  | #09ca28 | Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.                                                                                                        | http://dummyimage.com/112x100.png/cc0000/ffffff | 91dc4175-2b47-4097-8fb6-3592243d303d | 4431e021-38d5-4411-bc3e-66cf056c0a08 |
| 2022-12-12 18:30:27.790341+00 | Outdoors              | #8e49cc | Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.                                                                                                                                                                                                                                          | http://dummyimage.com/123x100.png/dddddd/000000 | 3890c872-7175-4f73-9a02-5d8c74163e4b | c9cf5a60-537d-4ace-b1b2-b30faf2cfaf5 |
| 2022-12-12 18:33:12.870189+00 | Leafy Pondweed        | #ff3333 | Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.                                                                                                                                                                                                                                                                                                                                                                                                                   | http://dummyimage.com/147x100.png/cc0000/ffffff | 8d6a24b3-a654-4ad0-be2d-69f656e7851c | a9ae862a-2c84-49e1-ab1a-3ce278658533 |
| 2022-12-12 18:33:12.870189+00 | Cecidonia Lichen      | #ef831c | Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.                                                                                                                                                                                                                                                                                                                                                                                        | http://dummyimage.com/170x100.png/cc0000/ffffff | 91dc4175-2b47-4097-8fb6-3592243d303d | ef9ce89f-c050-4b3b-83b3-3e6320b91886 |
| 2022-12-12 18:33:12.870189+00 | Hedge Cactus          | #060ab0 | Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.         | http://dummyimage.com/126x100.png/5fa2dd/ffffff | fcd3b737-24bd-462b-a0a3-f30a34bd055a | 60f330e6-78b4-405b-ae9f-9d72ed82b42b |
| 2022-12-12 18:33:12.870189+00 | Twisted Draba         | #8a63bf | Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.                                                                                                                                                                                                                                                                                                                                                                                   | http://dummyimage.com/136x100.png/cc0000/ffffff | 1ddacdc6-3409-486b-89a2-14b405cd0597 | ae11e890-f87a-4acf-82dc-391a0e29b806 |
| 2022-12-12 18:33:12.870189+00 | Tall Spiny Milkvetch  | #93f7f2 | Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.                                                                                                                                                                                                                                                                                                                   | http://dummyimage.com/150x100.png/cc0000/ffffff | 1ddacdc6-3409-486b-89a2-14b405cd0597 | b05d5a9f-26b3-4f4a-a6d4-b40d71f5d9cf |
| 2022-12-12 18:33:12.870189+00 | Roadside Pepperweed   | #0e5610 | Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.                                                                                                                                                  | http://dummyimage.com/178x100.png/ff4444/ffffff | 3890c872-7175-4f73-9a02-5d8c74163e4b | 4485d69c-27fc-451d-b15b-99e3b5ce8108 |
| 2022-12-12 18:33:12.870189+00 | Flavopunctelia Lichen | #61375d | Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.                                            | http://dummyimage.com/235x100.png/5fa2dd/ffffff | 3890c872-7175-4f73-9a02-5d8c74163e4b | 64b1c23b-0745-4196-8481-b57ebc2d39ea |
| 2022-12-12 18:33:12.870189+00 | Narrowleaf Swordfern  | #797a81 | Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.                                                                                                                                                                                                                                                                        | http://dummyimage.com/139x100.png/dddddd/000000 | fcd3b737-24bd-462b-a0a3-f30a34bd055a | 91c7fe2a-b9a2-4c36-8ddd-9a74e1b22c2a |
| 2022-12-12 18:33:12.870189+00 | Polyblastia Lichen    | #14c358 | Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. | http://dummyimage.com/229x100.png/5fa2dd/ffffff | 8d6a24b3-a654-4ad0-be2d-69f656e7851c | f78da2cf-d3a9-430e-861d-a12222ba5f75 |
| 2022-12-12 18:33:12.870189+00 | Actinidia             | #f74c5b | Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.                                                                                                                                                                                                                                                                                                                                                                                                           | http://dummyimage.com/217x100.png/ff4444/ffffff | 8d6a24b3-a654-4ad0-be2d-69f656e7851c | 7819cf2c-b0cd-4c55-b371-a8a5c9d73422 |

8cc300cc-3402-4747-bff4-d8b529820c15,459a0f97-d664-42f1-8c81-31a1571e0857,ebc7e3fd-d232-4148-9a57-a9a290b54935,4431e021-38d5-4411-bc3e-66cf056c0a08,c9cf5a60-537d-4ace-b1b2-b30faf2cfaf5,a9ae862a-2c84-49e1-ab1a-3ce278658533
