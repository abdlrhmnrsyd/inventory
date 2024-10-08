PGDMP  8        
        	    |            inventory_db    16.3    16.3 *               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24683    inventory_db    DATABASE     �   CREATE DATABASE inventory_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE inventory_db;
                postgres    false            �            1259    24859    folder_paths    TABLE     �   CREATE TABLE public.folder_paths (
    id integer NOT NULL,
    folder_path text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    title character varying(255)
);
     DROP TABLE public.folder_paths;
       public         heap    postgres    false            �            1259    24858    folder_paths_id_seq    SEQUENCE     �   CREATE SEQUENCE public.folder_paths_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.folder_paths_id_seq;
       public          postgres    false    224                       0    0    folder_paths_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.folder_paths_id_seq OWNED BY public.folder_paths.id;
          public          postgres    false    223            �            1259    24703 	   microsoft    TABLE     p  CREATE TABLE public.microsoft (
    id integer NOT NULL,
    company_name character varying(255) NOT NULL,
    department character varying(255),
    user_name character varying(255) NOT NULL,
    account character varying(255),
    products_name character varying(255) NOT NULL,
    sku_number character varying(100),
    version character varying(50),
    type_license character varying(50),
    contact_number character varying(20),
    qty integer NOT NULL,
    effective_date date,
    expired_date date,
    po character varying(100),
    vendor_name character varying(255),
    email_vendor character varying(255)
);
    DROP TABLE public.microsoft;
       public         heap    postgres    false            �            1259    24702    microsoft_id_seq    SEQUENCE     �   CREATE SEQUENCE public.microsoft_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.microsoft_id_seq;
       public          postgres    false    220                       0    0    microsoft_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.microsoft_id_seq OWNED BY public.microsoft.id;
          public          postgres    false    219            �            1259    24694    pc    TABLE     �  CREATE TABLE public.pc (
    id integer NOT NULL,
    it_code character varying(50) NOT NULL,
    brand character varying(100),
    serial_number character varying(100),
    ip_address character varying(50),
    mac_address character varying(50),
    host_name character varying(100),
    location character varying(100),
    business_unit character varying(100),
    department character varying(100),
    username character varying(100),
    status character varying(255)
);
    DROP TABLE public.pc;
       public         heap    postgres    false            �            1259    24693 	   pc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
     DROP SEQUENCE public.pc_id_seq;
       public          postgres    false    218                       0    0 	   pc_id_seq    SEQUENCE OWNED BY     7   ALTER SEQUENCE public.pc_id_seq OWNED BY public.pc.id;
          public          postgres    false    217            �            1259    24685    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    name character varying(100) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24684    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            �            1259    24850    vendor_repair    TABLE     �  CREATE TABLE public.vendor_repair (
    id integer NOT NULL,
    repair_date date,
    ticket_number character varying(255),
    ageing character varying(255),
    engineer_name character varying(255),
    username character varying(255),
    bu_name character varying(255),
    material_name character varying(255),
    brand character varying(255),
    type character varying(255),
    serial_number character varying(255),
    cost_center character varying(255),
    pr_number character varying(255),
    po_number character varying(255),
    quotation_date date,
    cost_without numeric,
    status character varying(255),
    vendor_delivery character varying(255),
    date date,
    created_by_ses character varying(255),
    remarks text
);
 !   DROP TABLE public.vendor_repair;
       public         heap    postgres    false            �            1259    24849    vendor_repair_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_repair_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.vendor_repair_id_seq;
       public          postgres    false    222                       0    0    vendor_repair_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.vendor_repair_id_seq OWNED BY public.vendor_repair.id;
          public          postgres    false    221            h           2604    24862    folder_paths id    DEFAULT     r   ALTER TABLE ONLY public.folder_paths ALTER COLUMN id SET DEFAULT nextval('public.folder_paths_id_seq'::regclass);
 >   ALTER TABLE public.folder_paths ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            f           2604    24706    microsoft id    DEFAULT     l   ALTER TABLE ONLY public.microsoft ALTER COLUMN id SET DEFAULT nextval('public.microsoft_id_seq'::regclass);
 ;   ALTER TABLE public.microsoft ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            e           2604    24697    pc id    DEFAULT     ^   ALTER TABLE ONLY public.pc ALTER COLUMN id SET DEFAULT nextval('public.pc_id_seq'::regclass);
 4   ALTER TABLE public.pc ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            d           2604    24688    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            g           2604    24853    vendor_repair id    DEFAULT     t   ALTER TABLE ONLY public.vendor_repair ALTER COLUMN id SET DEFAULT nextval('public.vendor_repair_id_seq'::regclass);
 ?   ALTER TABLE public.vendor_repair ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222                      0    24859    folder_paths 
   TABLE DATA           J   COPY public.folder_paths (id, folder_path, created_at, title) FROM stdin;
    public          postgres    false    224   �3                 0    24703 	   microsoft 
   TABLE DATA           �   COPY public.microsoft (id, company_name, department, user_name, account, products_name, sku_number, version, type_license, contact_number, qty, effective_date, expired_date, po, vendor_name, email_vendor) FROM stdin;
    public          postgres    false    220   �3                 0    24694    pc 
   TABLE DATA           �   COPY public.pc (id, it_code, brand, serial_number, ip_address, mac_address, host_name, location, business_unit, department, username, status) FROM stdin;
    public          postgres    false    218   J4       
          0    24685    users 
   TABLE DATA           =   COPY public.users (id, username, password, name) FROM stdin;
    public          postgres    false    216   g4                 0    24850    vendor_repair 
   TABLE DATA             COPY public.vendor_repair (id, repair_date, ticket_number, ageing, engineer_name, username, bu_name, material_name, brand, type, serial_number, cost_center, pr_number, po_number, quotation_date, cost_without, status, vendor_delivery, date, created_by_ses, remarks) FROM stdin;
    public          postgres    false    222   O5                  0    0    folder_paths_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.folder_paths_id_seq', 9, true);
          public          postgres    false    223                       0    0    microsoft_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.microsoft_id_seq', 191, true);
          public          postgres    false    219                        0    0 	   pc_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.pc_id_seq', 36, true);
          public          postgres    false    217            !           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 7, true);
          public          postgres    false    215            "           0    0    vendor_repair_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.vendor_repair_id_seq', 12, true);
          public          postgres    false    221            y           2606    24867    folder_paths folder_paths_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.folder_paths
    ADD CONSTRAINT folder_paths_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.folder_paths DROP CONSTRAINT folder_paths_pkey;
       public            postgres    false    224            u           2606    24710    microsoft microsoft_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.microsoft
    ADD CONSTRAINT microsoft_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.microsoft DROP CONSTRAINT microsoft_pkey;
       public            postgres    false    220            o           2606    24701 
   pc pc_pkey 
   CONSTRAINT     H   ALTER TABLE ONLY public.pc
    ADD CONSTRAINT pc_pkey PRIMARY KEY (id);
 4   ALTER TABLE ONLY public.pc DROP CONSTRAINT pc_pkey;
       public            postgres    false    218            q           2606    24826    pc unique_ip_address 
   CONSTRAINT     U   ALTER TABLE ONLY public.pc
    ADD CONSTRAINT unique_ip_address UNIQUE (ip_address);
 >   ALTER TABLE ONLY public.pc DROP CONSTRAINT unique_ip_address;
       public            postgres    false    218            s           2606    24828    pc unique_mac_address 
   CONSTRAINT     W   ALTER TABLE ONLY public.pc
    ADD CONSTRAINT unique_mac_address UNIQUE (mac_address);
 ?   ALTER TABLE ONLY public.pc DROP CONSTRAINT unique_mac_address;
       public            postgres    false    218            k           2606    24690    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            m           2606    24692    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    216            w           2606    24857     vendor_repair vendor_repair_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.vendor_repair
    ADD CONSTRAINT vendor_repair_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.vendor_repair DROP CONSTRAINT vendor_repair_pkey;
       public            postgres    false    222                  x������ � �         �   x��NK
�0\���] %/i���Q��;7���}����!�b~0CV��*t9����8���|�q���l��Ў%���?3jE�sR�FYX�	�9$ m�f�ޔ	*�֒���Kk�� |����ę���|崝~F5�$����TB��5ZZ            x������ � �      
   �   x�5̱r�0  �9��̂#�"HΈ^��`�G�׷��۞(ky4�jKCv���I׺���ᮬ�-��g���l?��R�)���*T��|�R E�����ȹ���v�\��\�d%���.S�D�y]-�	:�Ucl��qɁ_2ټaZ���G(��|�^�zw����K����I��P�LYSM����`w��,V��MiF1�7#�_��bJ�         �   x�M��j�0����D�Ӧ�&;����v1���b�8���纐����3��2
�ˑ�D������	n]hUK8�I|�B��v�<��&�k���Χg�?2(�P;sd�Jmy��v��-�.�b���e]���5r쵕�1�t�m��jy6��TE�W4�`�hRѤ����I���)�G.ю��8#3�{�$��UKD     